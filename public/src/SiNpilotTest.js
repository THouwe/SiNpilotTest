////////////////////////////////////////////////////////////////////////////////
////////////////////////////// CONSTANTS ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var TODAY = new Date();
var DD = String(TODAY.getDate()).padStart(2, '0');
var MM = String(TODAY.getMonth() + 1).padStart(2, '0');
var YYYY = String(TODAY.getFullYear());
var DATE = YYYY + MM + DD;
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DEFINE TIMELINE /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
          /* create timeline */
          var timeline = [];
          var calib_timeline = {
            timeline: []
          };
          var SiN_timeline = {
            timeline: []
          };

////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
////////////////////////////// CALIBRATION /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
    /* page 1. welcome */
    var welcome = {
      data: {
        screen_ID: "Welcome"
      },
      type: "survey-html-form",
      preamble: "<p>Welcome to the experiment!</p>" +
        "Please enter your ID (numbers and/or text; e.g., YourInitials_testNr)",
      html: "<p>Participant ID: <input name='Part_ID' type='text' /></p>",
      on_finish: function(data){
        data.responses = JSON.parse(data.responses);
        console.log("data.responses: " + JSON.stringify(data.responses));
        jsPsych.data.addProperties({
          part_ID: data.responses.Part_ID,
        });
        console.log("jsPsych data: " + JSON.stringify(jsPsych.data.get().values()));
      }
    };

    /* pages 2-4. Instructions */
    var instructions_general = {
      data: {
        screen_ID: "Instructions"
      },
      type: "instructions",
      pages: [
        // page 2:
        "<p>This test is about recognising digits in noise and takes about 7 minutes.</p>" +
        "<p>To begin with, make sure that you are in a silent environment.</p>" +
        "<p>Please, wear headphones and make yourself comfortable.</p>"
      ],
      show_clickable_nav: true
    }

    var calib_preAudio = {
      type: 'html-button-response',
      stimulus: "<p>CALIBRATION</p>" +
      "<p>As a first step, please adjust the volume " +
      "of your loudspeakers while listening to a sound (a party crowd) " +
      "to a level that allows you to easily hear the sound, but which is, " +
      "at the same time, comfortable.</p>",
      choices: ["play"]
    };

    var calib_audioOut = {
      type: 'audio-keyboard-response',
      stimulus: '../../stimuli/calibration/partyCrowd11sec_eq.wav',
      choices: jsPsych.NO_KEYS,
      trial_duration: 10000,
      prompt: "Regulate volume.",
    response_ends_trial: false
    }

    var calib_postAudio = {
      type: 'html-button-response',
      stimulus: "<p>If you have set the volume, proceed to the test, " +
      "else replay the sound</p>",
      choices: ["replay", "proceed"]
    };

    var calib_node = {
      timeline: [calib_audioOut, calib_postAudio],
      loop_function: function(data){
        if(jsPsych.data.get().last(1).values()[0].button_pressed == 0){
            return true;
        } else {
            return false;
        }
      }
    }

/////// PUSH CALIBRATION TRIALS TO CALIBRATION TIMELINE /////////
    calib_timeline.timeline.push(welcome);
    calib_timeline.timeline.push(instructions_general);
    calib_timeline.timeline.push(calib_preAudio);
    calib_timeline.timeline.push(calib_node);
    timeline.push(calib_timeline);
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// SiNRT ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
    var instructions_SRT = {
      data: {screen_id: "instructions_SRT"},
      type: 'html-button-response',
      stimulus: "<p>TEST</p>" +
      "<p>As part of the test you will hear a number of male and female " +
      "speakers uttering a number between 0 and 9 in High German.</p>" +
      "<p>It will be hard to understand what number is said, as the " +
      "recording is embedded in noise.</p>" +
      "<p>Your task is to simply select with the cursor the button corresponding to the correct number.</p>" +
      "<p>Press 'Continue' to proceed to a practice trial.</p>",
      choices: ['Continue'],
      show_clickable_nav: true,
      on_finish: function() {
        // on_finish: function(data){
        console.log("INSTRUCTIONS SRT")
      }
    };
    // SRT_instructions_timeline.timeline = instructions_SRT;
    //   timeline.push(SRT_instructions_timeline);

var fixation_cross = {
  data: {screen_id: "fixation"},
  type: 'html-keyboard-response',
  stimulus: "<div style='font-size: 60px'><b>+</b></div>",
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000
}

var stimDir_SiN = "../../stimuli/SRT/SiN/";

var practice_trial_SiN = {
  type: 'audio-button-response-simple',
  data: {screen_id: "practice_trial", dB_SNR:-8, speaker:1, digit_id: "1"},
  stimulus: stimDir_SiN + "PRACTICE_Speaker01_1_-8dB_SNR_16k.wav",
  choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  prompt: "<p>What number was said?</p>" //,
  // on_finish: function(data){
  //   if (data.button_pressed == data.digit_id){
  //     data.accuracy = 1
  //   } else {
  //     data.accuracy = 0
  //   }
  // }
};

var start_SiNRT = {
  data: {screen_id: "start_SiNRT"},
  type: 'html-button-response',
  stimulus: "<p>Click below to get started with the actual test.</p>",
  choices: ['Start Test']
};

var STIMULI = [
  {stimulus: stimDir_SiN + "STIM_Speaker01_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:1, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:5, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:6, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:7, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:8, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:10, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:12, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:13, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:14, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:16, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:21, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:25, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:33, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:48, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:49, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_0_-3dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-3, speaker:61, digit_id: "0"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:1,  digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:5,  digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:6,  digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:7,  digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:8,  digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:10, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:12, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:13, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:14, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:16, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:21, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:25, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:33, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:48, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:49, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_1_-8dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-8, speaker:61, digit_id: "1"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:1,  digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:5,  digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:6,  digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:7,  digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:8,  digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:10, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:12, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:13, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:14, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:16, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:21, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:25, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:33, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:48, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:49, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_2_-10dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-10, speaker:61, digit_id: "2"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:1,  digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:5,  digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:6,  digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:7,  digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:8,  digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:10, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:12, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:13, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:14, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:16, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:21, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:25, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:33, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:48, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:49, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_3_-7dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-7, speaker:61, digit_id: "3"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:1,  digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:5,  digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:6,  digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:7,  digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:8,  digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:10, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:12, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:13, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:14, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:16, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:21, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:25, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:33, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:48, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:49, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_4_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:61, digit_id: "4"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:1,  digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:5,  digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:6,  digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:7,  digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:8,  digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:10, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:12, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:13, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:14, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:16, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:21, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:25, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:33, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:48, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:49, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_5_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:61, digit_id: "5"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:1,  digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:5,  digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:6,  digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:7,  digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:8,  digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:10, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:12, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:13, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:14, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:16, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:21, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:25, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:33, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:48, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:49, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_6_-13dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-13, speaker:61, digit_id: "6"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:1,  digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:5,  digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:6,  digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:7,  digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:8,  digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:10, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:12, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:13, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:14, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:16, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:21, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:25, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:33, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:48, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:49, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_8_-11dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-11, speaker:61, digit_id: "8"}},
  {stimulus: stimDir_SiN + "STIM_Speaker01_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:1,  digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker05_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:5,  digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker06_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:6,  digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker07_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:7,  digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker08_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:8,  digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker10_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:10, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker12_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:12, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker13_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:13, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker14_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:14, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker16_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:16, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker21_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:21, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker25_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:25, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker33_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:33, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker48_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:48, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker49_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:49, digit_id: "9"}},
  {stimulus: stimDir_SiN + "STIM_Speaker61_9_-5dB_SNR_16k.wav", data: {screen_id: TRIALS, dB_SNR:-5, speaker:61, digit_id: "9"}}
];

var TRIALS = {
 type: 'audio-button-response-simple',
 data: jsPsych.timelineVariable("data"),
 stimulus: jsPsych.timelineVariable("stimulus"),
 choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
 prompt: "<p>What number was said?</p>",
 on_finish: function(data){
   if (data.button_pressed == data.digit_id){
     data.accuracy = 1
   } else {
     data.accuracy = 0
   }
   console.log('TRIALS digit ' + data.digit_id);
 }
};

var procedure_practiceSiN = {
 timeline: [fixation_cross, practice_trial_SiN, start_SiNRT]
};

var PROCEDURE = {
 timeline: [fixation_cross, TRIALS],
 // timeline: [fixation_cross, WRAPPER],
 timeline_variables: STIMULI,
 randomize_order: true,
 on_finish: function(data){
 }
};

SiN_timeline.timeline.push(instructions_SRT);
SiN_timeline.timeline.push(procedure_practiceSiN);
SiN_timeline.timeline.push(PROCEDURE);
timeline.push(SiN_timeline);
// SRT_timeline.timeline.push(instructions_SRT)
// SRT_timeline.timeline.push(SiN_timeline)


////////////////////////////////////////////////////////////////////////////////
//////////////////////// START EXPERIMENT //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function start_SiNpilotTest() {
  console.log("startExp reached")

  var audioFiles = [stimDir_SiN + "PRACTICE_Speaker01_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_0_-3dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_1_-8dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_2_-10dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_3_-7dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_4_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_5_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_6_-13dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_8_-11dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker01_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker05_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker06_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker07_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker08_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker10_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker12_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker13_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker14_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker16_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker21_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker25_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker33_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker48_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker49_9_-5dB_SNR_16k.wav",
    stimDir_SiN + "STIM_Speaker61_9_-5dB_SNR_16k.wav"
  ];

  /* start the experiment */
  jsPsych.init({
   preload_audio: audioFiles,
   timeline: timeline,
   // timeline: [calib_timeline, SiN_timeline],
    use_webaudio: true,
    // use_webaudio: false,
    on_interaction_data_update: function(data) {
      var cTrial = jsPsych.currentTrial();
      // cTrial.data.event = data.event;
      cTrial.event = data.event;
    },
    on_finish: function() {
      $.ajax({
        type: "POST",
        url: "/experiment-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
      })

      .done(function(){
        // jsPsych.data.displayData();
        window.location.href = "finish";
        // alert("You have completed the experiment and the data have been saved!");
      })

      .fail(function(){
        alert("Problem occurred while writing data to Dropbox. " +
              "Data will be saved to your computer. " +
              "Please contact the experimenter!");
        var csv = jsPsych.data.get().csv();
        var filename = "SiNpilotTestData" + jsPsych.data.get().values()[0].part_ID + "_" + DATE + ".csv";
        // var filename = "ACexp_part" + jsPsych.data.get().values()[0].Part_ID + "_" + " + DATE + " + ".csv";
        downloadCSV(csv,filename);
        window.location.href = "finish";
      })

      // jsPsych.data.displayData();
    }
  });
};
