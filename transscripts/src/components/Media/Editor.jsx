import "../../App.css";
import React, { useRef, useEffect, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  editorWithColumnsInitConfig,
  editorWithOutColumnsInitConfig,
} from "./EditorsConfig/editorConfigs";
import {
  Button,
  Box,
  LinearProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Requests from "../../logic/Requests";
import CustomSnackBarAlert from "../global/CustomSnackBarAlert";
import useShow from "../../hooks/useShow";
import KeyboardShortCuts from "./KeyboardShortCuts";
import KeyboardUnitShortCuts from "./KeyboardUnitShortCuts";
import ConnectPedalModal from "./ConnectPedalModal";
import ApproveUnit from "./ApproveUnit";
import SubmitUnit from "./SubmitUnit";
import useZustant from "../../hooks/useZustant";
import { useNavigate } from "react-router-dom";
import EditorUtils from "../../editorUtils";
import AutoRewind from "./AutoRewind";
import useFetch from "../../hooks/useFetch";
import ReassignUnitModal from "./ReassignUnitModal/ReassignUnitModal";
import SendBackModal from "./SendBackModal";
import AssignUnitModal from "./AssignUnitModal";
import Config from "../../config/index";
import { Hearing } from "@material-ui/icons";
import Utils from "../../utils";

function EditorComponent(props) {
  let { idUnit } = useParams();
  let { fileType, length, dataUnit, unit, multichannel } = props.data;
  const hasSpeakersColumns = props.hasSpeakersColumns;
  const editorInitConfig = props.hasSpeakersColumns
    ? editorWithColumnsInitConfig
    : editorWithOutColumnsInitConfig;
  const { user, getUser } = useZustant();
  let mediaLink = `${Requests.getEndpoint()}/unit/download/${idUnit}${
    fileType === "audio" ? ".mp3" : ".mp4"
  }`;
  let media, QAButtons, TButtons, LoadingAlignmentQA, content;
  const editorRef = useRef(null);
  const { show: showAlert, open: openAlert, close: closeAlert } = useShow();
  const [alertContent, setAlertContent] = React.useState("");
  const [alertType, setAlertType] = React.useState("error");
  const speakerList = React.useRef([]);
  const speakerOrder = React.useRef([]);
  const [rewindTime, setRewindTime] = React.useState(0);
  const [playBack, setPlayback] = React.useState(true);
  const [userHotKeys, setUserHotKeys] = React.useState(null);
  const [unitHotKeys, setUnitHotKeys] = React.useState(null);
  const [editorFocus, setEditorFocus] = React.useState(false);
  const [menuChannel, setMenuChannel] = React.useState({
    open: false,
    anchorEl: "",
  });
  const defaultAutoRewindTime = user.autoRewindTime ?? 3;
  const editorAutoRewindTime = useRef(defaultAutoRewindTime);
  const [useUnitHotkeys, setUseUnitHotkeys] = React.useState(false);
  const lastSetTimeOutId = React.useRef(null);
  const currentTimeToDoRewind = React.useRef(3);
  const keyHasBeenPressed = React.useRef(false);
  let isPlaying = false;
  const { data: unitScribeKeys, reFetch } = useFetch(
    Requests.getUnitScribeKeys,
    dataUnit._id,
    user.id
  );
  const handleAlert = (type, content) => {
    setAlertType(type);
    setAlertContent(content);
    openAlert();
  };

  const {
    show: showReassign,
    open: openReassign,
    close: closeReassign,
  } = useShow();

  const {
    show: showSendBack,
    open: openSendBack,
    close: closeSendBack,
  } = useShow();

  const { show: showAssign, open: openAssign, close: closeAssign } = useShow();

  const audioRef = useRef(null);
  const [wordAlignmentProcess, setWordAlignmentProcess] = React.useState(false);


  useEffect(() => {
    setUserHotKeys(() => {
      if (user.scribeKeys && user.scribeKeys !== "") {
        return Object.entries(user.scribeKeys).map(([key, value]) => {
          return {
            ...Utils.DEFAULT_KEYS[key],
            ...value,
          };
        });
      } else {
        return Utils.DEFAULT_KEYS;
      }
    });

    setUnitHotKeys(() => {
      if (unitScribeKeys != null && unitScribeKeys !== "") {
        const scribeKeys = JSON.parse(unitScribeKeys.unit_scribe_keys);
        let a = Object.entries(scribeKeys).map(([key, value]) => {
          return {
            keyCode: value.keyCode,
            key: value.key,
            ctrlKey: value.ctrlKey,
            label: <label>key</label>,
            cmd: key,
            type: "String",
          };
        });
        return a;
      } else {
        return [];
      }
    });
  }, [user, dataUnit, unitScribeKeys]);

  const fixAudio = () => {
    Requests.audioFix(idUnit).then(() => {
      audioRef.current.load();
    });
    alert("the audio unit is getting fixed, please wait a moment");
  };
  const saveHotKeys = async (useUnit, scribeKeys, close) => {
    try {
      if (useUnit) {
        const object = {};
        Object.entries(scribeKeys).forEach(([key, value]) => {
          object[value.cmd] = {
            keyCode: value.keyCode,
            key: value.key,
            ctrlKey: value.ctrlKey,
          };
        });
        Requests.createUnitScribeKeys(dataUnit._id, user._id, object).then(
          (res) => {
            removeShortcuts(unitHotKeys);
            reFetch();
            close();
          }
        );
      } else {
        const object = {};
        Object.entries(scribeKeys).forEach(([key, value]) => {
          object[value.cmd] = {
            ctrlKey: value.ctrlKey,
            key: value.key,
            keyCode: value.keyCode,
          };
        });

        Requests.saveUser(user._id, { scribeKeys: object }).then((res) => {
          removeShortcuts(userHotKeys);
          getUser();
          close();
        });
      }
    } catch (error) {
      handleAlert("error", "Error saving hotkeys");
    }
  };

  const play = () => {
    audioRef.current.currentTime -= currentTimeToDoRewind.current;
    audioRef.current.play();
  };

  const stop = () => {
    audioRef.current.pause();
  };

  const rwd = () => {
    audioRef.current.currentTime -= currentTimeToDoRewind.current;
  };

  const fwd = () => {
    audioRef.current.playbackRate += 0.1;
  };

  const fastFwd = () => {
    audioRef.current.currentTime += currentTimeToDoRewind.current;
  };

  const addShortcuts = (hotkeys) => {
    if (hotkeys && hotkeys != "" && hotkeys != null) {
      Object.entries(hotkeys).forEach(([key, value]) => {
        if (value.type === "String") {
          window.tinymce.activeEditor.shortcuts.add(
            value.ctrlKey ? `META+${value.keyCode}` : `${value.keyCode}`,
            value.label,
            () => {
              writeAWord(value.cmd);
            }
          );
        } else {
          window.tinymce.activeEditor.shortcuts.add(
            value.ctrlKey ? `META+${value.keyCode}` : `${value.keyCode}`,
            value.label,
            () => {
              switch (value.cmd) {
                case "play":
                  play();
                  break;
                case "stop":
                  stop();
                  break;
                case "rwd":
                  rwd(editorAutoRewindTime.current);
                  break;
                case "fwd":
                  fwd();
                  break;
                case "cross":
                  CrossTalk();
                  break;
                case "inaud":
                  Inaudible();
                  break;
                default:
                  break;
              }
            }
          );
        }
      });
    }
  };

  const removeShortcuts = (hotkeys) => {
    if (hotkeys && hotkeys != "" && hotkeys != null) {
      Object.entries(hotkeys).forEach(([key, value]) => {
        window.tinymce.activeEditor.shortcuts.remove(
          value.ctrlKey ? `META+${value.keyCode}` : `${value.keyCode}`
        );
      });
    }
  };

  function writeAWord(word) {
    window.tinymce.activeEditor.execCommand(
      "mceInsertContent",
      false,
      `<span> ${word} </span> `
    );
  }

  useEffect(() => {
    if (window.tinymce) {
      removeShortcuts(userHotKeys);
      removeShortcuts(unitHotKeys);
      addShortcuts(userHotKeys);
      addShortcuts(unitHotKeys);
    }
  }, [useUnitHotkeys, userHotKeys, unitHotKeys]);

  const handleRewind = (value) => {
    setRewindTime(value);
  };

  const handlePlayBack = (value) => {
    setPlayback(value);
  };

  const handleEnded = () => {
    setTimeout(() => {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }, rewindTime * 1000);
  };

  const navigate = useNavigate();
  if (dataUnit && dataUnit.content && !dataUnit.content.blocks) {
    content = JSON.parse(dataUnit.content);
  }
  const handleSave = async (state, isAutoSave = false, doc) => {
    if (unit.new_editor_transcript) {
      try {
        var pattern = /\/unit\/([a-zA-Z0-9]+)$/;
        var matches = pattern.exec(window.location.href);
        let content = {
          speakerList: EditorUtils.getSpeakerList().toString(),
          html: window.tinymce.activeEditor.getContent(),
        };
        content = JSON.stringify(content);
        doc = {
          ...doc,
          content,
          autosave: false,
          state,
          newEditor: true,
          transcript_duration: length,
        };
        await Requests.saveUnit(matches[1], doc);
        if (user.rolename !== "Transcriber" && !isAutoSave) {
          window.location.replace(
            `${Config.oldUI}` + window.location.pathname.split("unit")[0]
          );
          return;
        }
        if (!isAutoSave && user.rolename === "Transcriber") {
          setAlertType("success");
          setAlertContent("Content saved successfully");
          openAlert();
          navigate(`/projects/queue/${user._id}`);
        }
      } catch (error) {
        setAlertType("error");
        setAlertContent("An error occurred while saving the content");
        openAlert();
        console.error(error);
      }
    }
  };
  function Inaudible(e) {
    window.tinymce.activeEditor.execCommand(
      "mceInsertContent",
      false,
      '<span class="InaudibleTag Tags mceNonEditable" id="InaudibleTag">[INAUDIBLE]</span>'
    );
  }
  function CrossTalk(e) {
    window.tinymce.activeEditor.execCommand(
      "mceInsertContent",
      false,
      '<span class="CrossTalkTag Tags mceNonEditable" id="CrossTalkTag">[CROSSTALK]</span> '
    );
  }
  function AddSpeaker() {
    const componentSpeaker = hasSpeakersColumns
      ? `
      <div class="SpeakerContent">
        <div class="SpeakerColumn">
          <p class="SpeakerInput" contenteditable="true">Add speaker</p>
        </div>
        <p class="EditorContent" contenteditable="true">&nbsp;</p>
      </div>
    `
      : `<p></p>`;
    let speaker = document.createElement("div");
    speaker.className = "RowSpeaker";
    speaker.innerHTML = componentSpeaker.trim();
    return speaker;
  }
  function WordAlignment(editor) {
    if (editor.selection.isCollapsed()) {
      var selRng = editor.selection.getRng();
      selRng.expand("word");
      editor.selection.setRng(selRng);
      const wordId = selRng.commonAncestorContainer.parentNode.id;
      const timeWord = content.json.fragments.filter((word) => {
        let id = word.id.replace("f", "");
        id = parseInt(id);
        const wordEditor = window.tinymce.activeEditor.dom.get(id.toString());
        if (wordEditor && wordEditor.classList.contains("Highlight")) {
          wordEditor.classList.remove("Highlight");
        }
        if (id === parseInt(wordId)) {
          return word;
        }
      });
      const audio = document.getElementById("audio");
      audio.currentTime = timeWord[0].begin;
    }
  }

  // Start highlight
  const highlightMedia = (e) => {
    if (
      content &&
      (user.rolename === "QA" ||
        user.rolename === "Admin" ||
        user.rolename === "PM") &&
      content.json
    ) {
      const media =
        fileType === "audio"
          ? document.getElementById("audio")
          : document.getElementById("video");
      const mediaCurrentTime = media.currentTime;
      const timeWord = content.json.fragments.filter((highlight) => {
        let word = highlight.lines[0];
        let begin = highlight.begin;
        let end = highlight.end;
        let id = parseInt(highlight.id.replace("f", "")).toString();
        const wordEditor = window.tinymce.activeEditor.dom.get(id);
        if (mediaCurrentTime >= begin && mediaCurrentTime <= end) {
          wordEditor.classList.add("Highlight");
          return word;
        } else {
          if (wordEditor && wordEditor.classList.contains("Highlight")) {
            wordEditor.classList.remove("Highlight");
          }
        }
        return word;
      });
    }
  };

  if (fileType === "audio") {
    media = (
      <audio
        src={mediaLink}
        controls
        style={{ marginBottom: 15, width: "100%" }}
        id="audio"
        onKeyUp={(e) => handleKeyUp(e)}
        onPlay={() => {
          if (playBack) {
            audioRef.current.currentTime -= currentTimeToDoRewind.current;
          }
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          keyHasBeenPressed.current = true;
        }}
        onTimeUpdate={highlightMedia}
        ref={audioRef}
        onEnded={playBack ? handleEnded : null}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  } else {
    media = (
      <video
        style={{ marginBottom: 15, width: "100%" }}
        src={mediaLink}
        controls
        onTimeUpdate={highlightMedia}
        ref={audioRef}
      >
        Your browser does not support the <code>video</code> element.
      </video>
    );
  }

  const startAeneasProcessManually = async () => {
    try {
      setWordAlignmentProcess(true);
      await Requests.startAeneasProcessManually(idUnit);
    } catch (error) {
      console.error(error);
    }
  };

  if (
    user.rolename === "QA" ||
    user.rolename === "Admin" ||
    user.rolename === "PM"
  ) {
    QAButtons = (
      <>
        {/* 
        Hidding section
        {user.id === "59e0dc4ef95b8d0011af1360" ? (
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            style={{
              borderColor: "rgb(9 137 82 / 75%)",
              color: "rgb(9 137 82 / 75%)",
            }}
            onClick={startAeneasProcessManually}
          >
            Start Word alignment
          </Button>  
        ) : null} */}

        {dataUnit.assignment.state === "Incomplete" ||
        dataUnit.assignment.state === "Ready for Review" ||
        dataUnit.assignment.state === "Complete" ? (
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            style={{
              borderColor: "rgba(101, 44, 144, 0.75)",
              color: "rgba(101, 44, 144, 0.75)",
            }}
            onClick={openSendBack}
          >
            Send back to Transcriber
          </Button>
        ) : null}
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          style={{
            borderColor: "rgba(26, 103, 158, 0.75)",
            color: "rgba(26, 103, 158, 0.75)",
          }}
          onClick={
            dataUnit.assignment.state === "New" ||
            !dataUnit.assignment.assigned_to
              ? () => openAssign()
              : () => openReassign()
          }
        >
          {dataUnit.assignment.state === "New" ||
          !dataUnit.assignment.assigned_to
            ? "Assign"
            : "Reassign"}
        </Button>
        {dataUnit.assignment.state == "Ready for Review" ||
        dataUnit.assignment.state == "Proofed" ||
        dataUnit.assignment.state == "Complete" ||
        dataUnit.assignment.state == "Incomplete" ? (
          <ApproveUnit length={dataUnit.length} state={unit.state} />
        ) : null}
        {dataUnit.assignment.state == "Assigned" ||
        dataUnit.assignment.state == "Confirmed" ||
        dataUnit.assignment.state == "Unassigned" ||
        dataUnit.assignment.state == "Revision" ? (
          <span style={{ marginLeft: "8px" }}>
            <SubmitUnit saveUnit={handleSave} />
          </span>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "10px",
          }}
        >
          <Button
            onClick={() => handleSave(unit.state)}
            variant="contained"
            style={{ backgroundColor: "#1976D2" }}
            sx={{ mr: 1 }}
          >
            Save & Close
          </Button>
          <Button
            onClick={() => {
              fixAudio();
            }}
            color="purple"
            variant="contained"
            sx={{ ml: 1 }}
            style={{ backgroundColor: "#1976D2", color: "white" }}
          >
            Fix audio
          </Button>
          {user.rolename === "QA" ? (
            <Button
              variant="contained"
              color="red"
              sx={{ ml: 1 }}
              style={{ color: "white" }}
              onClick={() => props.open()}
            >
              Unassign Unit
            </Button>
          ) : null}
        </div>
      </>
    );
    if (dataUnit && dataUnit.content !== null) {
      if (!content.aeneas) {
        LoadingAlignmentQA = (
          <>
            <Typography textAlign="left">Word alignment in progress</Typography>
            <Box sx={{ width: "100%", my: 2 }}>
              <LinearProgress />
            </Box>
          </>
        );
      } else {
        content.json = JSON.parse(content.json);
      }
    } else {
      LoadingAlignmentQA = (
        <>
          <Typography textAlign="left">Word alignment in progress</Typography>
          <Box sx={{ width: "100%", my: 2 }}>
            <LinearProgress />
          </Box>
        </>
      );
    }
  }
  if (user.rolename === "Transcriber") {
    TButtons = (
      <>
        <Button
          onClick={() => handleSave("In Progress")}
          color="success"
          variant="contained"
          sx={{ mr: 1 }}
          style={{ backgroundColor: "#1976D2", color: "white" }}
        >
          Save & Close
        </Button>
        <SubmitUnit saveUnit={handleSave} />
        <Button
          onClick={() => {
            fixAudio();
          }}
          color="purple"
          variant="contained"
          sx={{ ml: 1 }}
          style={{ backgroundColor: "#1976D2", color: "white" }}
        >
          Fix audio
        </Button>
        <Button
          variant="contained"
          color="red"
          sx={{ ml: 1 }}
          style={{ color: "white" }}
          onClick={() => props.open()}
        >
          Unassign Unit
        </Button>
      </>
    );
  }

  const handleKeyUp = useCallback(
    (e) => {
      const shortCutsDictionary = {
        play: play,
        stop: stop,
        rwd: rwd,
        fwd: fwd,
      };
      if (keyHasBeenPressed.current) {
        if (userHotKeys) {
          for (let action in userHotKeys) {
            if (userHotKeys[action].key === e.key) {
              shortCutsDictionary[userHotKeys[action].cmd]();
            }
          }
        }
        keyHasBeenPressed.current = false;
      }
    },
    [userHotKeys]
  );

  const hanldeMenuChannel = (e) => {
    setMenuChannel({
      open: menuChannel.open ? false : true,
      anchorEl: menuChannel.open ? null : e.currentTarget,
    });
  };

  const handlePlayMultiChannel = (e) => {
    let src = "";
    switch (e.target.id) {
      case "Original":
        src = Requests.buildURL(`/unit/download/${idUnit}` + ".mp3");
        break;
      case "Left-Channel":
        src = Requests.buildURL(`/unit/downloadLeft/${idUnit}` + ".mp3");
        break;
      case "Right-Channel":
        src = Requests.buildURL(`/unit/downloadRight/${idUnit}` + ".mp3");
      default:
        break;
    }
    audioRef.current.src = src;
    audioRef.current.load();
    hanldeMenuChannel();
  };

  const reciveCommand = (command) => {
    switch (command) {
      case 1:
        rwd();
        break;
      case 2:
        if (
          audioRef.current.paused &&
          !isPlaying &&
          navigator.userActivation.hasBeenActive
        ) {
          play();
          if (!audioRef.current.paused) {
            isPlaying = true;
          }
        } else {
          if (navigator.userActivation.hasBeenActive) {
            stop();
            if (audioRef.current.paused) {
              isPlaying = false;
            }
          }
        }

        break;
      case 4:
        fastFwd();
        break;
      default:
        break;
    }
  };

  return dataUnit ? (
    <div onKeyUp={(e) => handleKeyUp(e)} style={{ padding: 20 }}>
      <>
        <CustomSnackBarAlert
          show={showAlert}
          close={closeAlert}
          type={alertType}
        >
          {alertContent}
        </CustomSnackBarAlert>
        <ReassignUnitModal
          show={showReassign}
          close={closeReassign}
          dataUnit={dataUnit}
          handleAlert={handleAlert}
        />

        <AssignUnitModal
          show={showAssign}
          close={closeAssign}
          dataUnit={dataUnit}
          handleAlert={handleAlert}
        />

        <SendBackModal
          show={showSendBack}
          close={closeSendBack}
          dataUnit={dataUnit}
          handleAlert={handleAlert}
        />
        <div style={{ display: "flex" }}>
          {multichannel ? (
            <div>
              <IconButton id="audioMenu" onClick={hanldeMenuChannel}>
                <Hearing style={{ color: "black" }} />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={menuChannel.anchorEl}
                open={menuChannel.open}
                onClose={hanldeMenuChannel}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem id="Original" onClick={handlePlayMultiChannel}>
                  Play Original Audio
                </MenuItem>
                <MenuItem id="Left-Channel" onClick={handlePlayMultiChannel}>
                  Play Left Channel
                </MenuItem>
                <MenuItem id="Right-Channel" onClick={handlePlayMultiChannel}>
                  Play Right Channel
                </MenuItem>
              </Menu>
            </div>
          ) : null}
          {media}
        </div>
        {dataUnit.assignment.total_assignment <= 10 &&
        user.rolename === "QA" ? (
          <Alert severity="warning" variant="filled">
            <AlertTitle>Warning</AlertTitle>
            <strong>Require extra proofreading!</strong>
          </Alert>
        ) : null}
        {/* Hidding section
      {user.id === "59e0dc4ef95b8d0011af1360" ? LoadingAlignmentQA : null}
      {wordAlignmentProcess &&
      user.rolename !== "Transcriber" &&
      user.id === "59e0dc4ef95b8d0011af1360" ? (
        <>
          <Typography textAlign="left">Word alignment in progress</Typography>
          <Box sx={{ width: "100%", my: 2 }}>
            <LinearProgress />
          </Box>
        </>
      ) : null} */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginBottom: 20, marginTop: 10 }}>
            <Button
              variant="outlined"
              style={{
                marginRight: 10,
                borderColor: "#48494B",
                color: "#48494B",
              }}
              onClick={Inaudible}
            >
              INAUDIBLE
            </Button>
            <Button
              variant="outlined"
              style={{
                marginRight: 10,
                borderColor: "#48494B",
                color: "#48494B",
              }}
              onClick={CrossTalk}
            >
              CROSSTALK
            </Button>
            <KeyboardShortCuts
              userHotKeys={userHotKeys}
              unitHotKeys={unitHotKeys}
              useUnitHotkeys={false}
              refetchDataUnit={props.refetchDataUnit}
              saveHotKeys={saveHotKeys}
              handleAlert={handleAlert}
            />
            <KeyboardUnitShortCuts
              userHotKeys={userHotKeys}
              unitHotKeys={unitHotKeys}
              useUnitHotkeys={true}
              refetchDataUnit={props.refetchDataUnit}
              saveHotKeys={saveHotKeys}
              handleAlert={handleAlert}
            />

            <AutoRewind
              handleRewind={handleRewind}
              handlePlayBack={handlePlayBack}
              currentTimeToDoRewind={currentTimeToDoRewind}
            />
            <ConnectPedalModal sendCommand={reciveCommand} />
          </div>
          <div style={{ marginBottom: 20, marginTop: 10 }}>
            {QAButtons}
            {TButtons}
          </div>
        </div>
      </>

      <Editor
        id="editor"
        apiKey={Config.editorApiKey}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.getBody().className = "EditorBody";
          const activeEditor = window.tinymce.activeEditor;
          activeEditor.setProgressState(true);
          activeEditor.setProgressState(false, 2000);
        }}
        init={editorInitConfig({
          speakerList,
          speakerOrder,
          content,
          user,
          setEditorFocus,
          WordAlignment,
          AddSpeaker,
          lastSetTimeOutId,
          handleSave,
        })}
      />
    </div>
  ) : null;
}

export default EditorComponent;
