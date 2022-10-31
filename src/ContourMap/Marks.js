import React from "react";
import * as d3 from "d3";
import {
  interpolateRgb,
  interpolateRdBu,
  interpolatePuBuGn,
  interpolateTurbo
} from "d3";

export const Marks = () => {
  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#App")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#191f45");
  // frequency data not used - all data read in x and y
  // is to read in csv file
  const data = [
    {
      user_id: 42808,
      question: "See the Emotion of the day in the Recommended Section",
      emotion: "Desire",
      x: -0.3075,
      y: -0.4025,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 508161,
      emotion_id: 54358,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42804,
      question: "How do you feel about identifying feelings?",
      emotion: "Enthusiastic",
      x: -0.6944852267,
      y: -0.8274904837,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 506921,
      emotion_id: 1336,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42804,
      question: "How do you feel about having mixed emotions?",
      emotion: "OK",
      x: -0.33,
      y: -0.385,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 506881,
      emotion_id: 3009,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42814,
      question:
        "How do you feel about your ability to hold firm (emotional Strength)",
      emotion: "Moved",
      x: -0.6579065431,
      y: -0.1436690198,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 509041,
      emotion_id: 1384,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42804,
      question:
        "How do you feel about your ability to hold firm (emotional Strength)",
      emotion: "Confident",
      x: -0.703483848,
      y: -0.4566789974,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 506841,
      emotion_id: 1373,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42820,
      question: null,
      emotion: "Decent",
      x: -0.0164086148,
      y: 0.1231868291,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509641,
      emotion_id: 1522,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "Samsung Galaxy A70"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Cheerful",
      x: -0.39125,
      y: -0.2183333333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 509321,
      emotion_id: 1450,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Cautious",
      x: 0.0466666667,
      y: 0.0920833333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509681,
      emotion_id: 2704,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Loved",
      x: -0.8028372922,
      y: -0.1615992246,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 510521,
      emotion_id: 1366,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Loved",
      x: -0.8028372922,
      y: -0.1615992246,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 510561,
      emotion_id: 1366,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Anticipation",
      x: -0.165,
      y: -0.46125,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 510641,
      emotion_id: 1469,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Busy",
      x: -0.1920833333,
      y: -0.68,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511281,
      emotion_id: 1437,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Worried",
      x: 0.0404847539,
      y: -0.7126134733,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511761,
      emotion_id: 2134,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Dry ",
      x: 0.0666666667,
      y: 0.0566666667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512761,
      emotion_id: 508681,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42808,
      question: null,
      emotion: "Anticipation",
      x: -0.165,
      y: -0.46125,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-21 23:00:00",
      log_id: 513361,
      emotion_id: 1469,
      ethnicity: "Other",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42806,
      question: null,
      emotion: "Thoughtful",
      x: -0.1004781495,
      y: 0.0602458733,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 508081,
      emotion_id: 1499,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42806,
      question: null,
      emotion: "Keen",
      x: -0.1112285515,
      y: -0.8480227919,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509601,
      emotion_id: 1854,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42806,
      question: null,
      emotion: "Grateful",
      x: -0.6811156492,
      y: 0.1968447178,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509721,
      emotion_id: 1403,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42806,
      question: null,
      emotion: "Thoughtful",
      x: -0.1004781495,
      y: 0.0602458733,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511081,
      emotion_id: 1499,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42806,
      question: null,
      emotion: "Prepared",
      x: -0.0795833333,
      y: -0.4295833333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512521,
      emotion_id: 1679,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42806,
      question: null,
      emotion: "Fatigued",
      x: 0.1994446961,
      y: 0.6825738633,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-22 23:00:00",
      log_id: 513601,
      emotion_id: 2243,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42814,
      question: null,
      emotion: "Manly",
      x: -0.37,
      y: -0.315,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 22:00:00",
      log_id: 509881,
      emotion_id: 54387,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42814,
      question: null,
      emotion: "Optimistic",
      x: -0.9633159305,
      y: -0.2116592822,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 22:00:00",
      log_id: 510441,
      emotion_id: 1369,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42814,
      question: null,
      emotion: "Manly",
      x: -0.37,
      y: -0.315,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 22:00:00",
      log_id: 511561,
      emotion_id: 54387,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42814,
      question: null,
      emotion: "Effective",
      x: -0.2314263554,
      y: -0.2905954656,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 22:00:00",
      log_id: 511801,
      emotion_id: 1463,
      ethnicity: "White",
      gender: "Female",
      highest_education_achieved: "University",
      device_data: "iphone 12"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Nostalgic",
      x: -0.310300652,
      y: -0.2005487731,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 505641,
      emotion_id: 2929,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Contrite",
      x: 0.2574545085,
      y: 0.3899925702,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 505721,
      emotion_id: 2868,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Tottery",
      x: 0.2191666667,
      y: 0.2816666667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 505761,
      emotion_id: 54289,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Blissful",
      x: -0.3025,
      y: -0.4425,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 505841,
      emotion_id: 54346,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Despondent",
      x: 0.7087080434,
      y: 0.956696434,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 506601,
      emotion_id: 2398,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Resolute",
      x: -0.0720833333,
      y: -0.2204166667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 506641,
      emotion_id: 1371,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Entrapped",
      x: 0.39,
      y: -0.1425,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 506681,
      emotion_id: 54276,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42802,
      question: null,
      emotion: "Resolute",
      x: -0.0720833333,
      y: -0.2204166667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 506721,
      emotion_id: 1371,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "University",
      device_data: "S10"
    },
    {
      user_id: 42804,
      question: null,
      emotion: "Relieved",
      x: -0.3173745308,
      y: 0.7902869461,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 506321,
      emotion_id: 1515,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 42804,
      question: null,
      emotion: "Annoyed",
      x: 0.3854426317,
      y: -0.9585190503,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511881,
      emotion_id: 2139,
      ethnicity: "White",
      gender: "Male",
      highest_education_achieved: "Doctorate",
      device_data: "iPhone 12"
    },
    {
      user_id: 171723,
      question: null,
      emotion: "Refreshed",
      x: -0.7141666667,
      y: -0.2908333333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 507921,
      emotion_id: 1590,
      ethnicity: null,
      gender: "Male",
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 171729,
      question: null,
      emotion: "Serene",
      x: -0.8279968391,
      y: 0.794588661,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 509281,
      emotion_id: 1413,
      ethnicity: null,
      gender: "Other",
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 171729,
      question: null,
      emotion: "Good",
      x: -0.6670533841,
      y: 0.2868760387,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511841,
      emotion_id: 1405,
      ethnicity: null,
      gender: "Other",
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Dependent",
      x: 0.3649018236,
      y: 0.0442006141,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 18:30:00",
      log_id: 504841,
      emotion_id: 2609,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Ignorant",
      x: 0.4762528403,
      y: 0.2113267907,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 18:30:00",
      log_id: 504881,
      emotion_id: 2790,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Lost",
      x: 0.2140657719,
      y: -0.1759331785,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 18:30:00",
      log_id: 504921,
      emotion_id: 2165,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Calm",
      x: -0.2829779962,
      y: 0.9695951231,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 505001,
      emotion_id: 1761,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Exhausted",
      x: 0.3441666667,
      y: 0.78125,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 506201,
      emotion_id: 2262,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Calm",
      x: -0.2829779962,
      y: 0.9695951231,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 22:00:00",
      log_id: 507601,
      emotion_id: 1761,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Worried",
      x: 0.0404847539,
      y: -0.7126134733,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 505041,
      emotion_id: 2134,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Quiet",
      x: -0.0466666667,
      y: 0.4595833333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 505081,
      emotion_id: 1504,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 503001,
      question: null,
      emotion: "Forceful",
      x: -0.0564115758,
      y: -0.9644821222,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 505361,
      emotion_id: 1432,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 114561,
      question: null,
      emotion: "Cheerful",
      x: -0.39125,
      y: -0.2183333333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 506161,
      emotion_id: 1450,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 405161,
      question: null,
      emotion: "Trusted",
      x: -0.6517398249,
      y: 0.9131314706,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-16 23:00:00",
      log_id: 507641,
      emotion_id: 1910,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 466281,
      question: null,
      emotion: "Hopeless",
      x: 0.8567658943,
      y: 0.8165988421,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 04:00:00",
      log_id: 505921,
      emotion_id: 2408,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Fear",
      x: 0.7070833333,
      y: -0.5466666667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 18:30:00",
      log_id: 507801,
      emotion_id: 2269,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Tired",
      x: 0.0475,
      y: 0.6054166667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 507841,
      emotion_id: 2241,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Drained",
      x: 0.4166666667,
      y: 0.96625,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 508881,
      emotion_id: 2263,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 479281,
      question: null,
      emotion: "Rugged",
      x: -0.0253120547,
      y: -0.0687087912,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 509121,
      emotion_id: 2956,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 479281,
      question: null,
      emotion: "Stalled",
      x: 0.0625,
      y: -0.3525,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 509161,
      emotion_id: 54258,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Lilo",
      x: -0.4433333333,
      y: 0.18,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 509201,
      emotion_id: 81081,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Good",
      x: -0.6670533841,
      y: 0.2868760387,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 22:00:00",
      log_id: 509241,
      emotion_id: 1405,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Committed",
      x: -0.2969518799,
      y: 0.0408305253,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 507881,
      emotion_id: 1482,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Elevated",
      x: -0.5295259853,
      y: -0.3892332843,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-17 23:00:00",
      log_id: 507961,
      emotion_id: 1424,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 495521,
      question: null,
      emotion: "Tense",
      x: 0.1075,
      y: -0.4695833333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 22:00:00",
      log_id: 509801,
      emotion_id: 2178,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Strong",
      x: -0.443056754,
      y: -0.6640615407,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 22:00:00",
      log_id: 509921,
      emotion_id: 1427,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Relaxed",
      x: -0.4575600682,
      y: 0.8300860801,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 22:00:00",
      log_id: 510681,
      emotion_id: 1514,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Keen",
      x: -0.1112285515,
      y: -0.8480227919,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509441,
      emotion_id: 1854,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 114561,
      question: null,
      emotion: "Buoyant",
      x: -0.3088957507,
      y: -0.0646676641,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509521,
      emotion_id: 1546,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 402601,
      question: null,
      emotion: "OK",
      x: -0.33,
      y: -0.385,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509561,
      emotion_id: 3009,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 402601,
      question: null,
      emotion: "Frustrated",
      x: 0.2944413131,
      y: -0.9277728831,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 509761,
      emotion_id: 3010,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 132481,
      question: null,
      emotion: "Fed up",
      x: 0.0536850165,
      y: 0.5821915269,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-18 23:00:00",
      log_id: 510081,
      emotion_id: 2564,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Envied",
      x: 0.06887861,
      y: -0.4528542093,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 511961,
      emotion_id: 2714,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Jealous",
      x: 0.67125,
      y: -0.2908333333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512001,
      emotion_id: 2308,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Desired",
      x: -0.27,
      y: -0.3,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512041,
      emotion_id: 54359,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Afraid",
      x: 0.7195773155,
      y: -0.5637168952,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512081,
      emotion_id: 2270,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Ashamed",
      x: 0.9330349031,
      y: -0.0346304183,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512121,
      emotion_id: 2297,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Alone",
      x: 0.2096198258,
      y: 0.9631454484,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512161,
      emotion_id: 2251,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Anxious",
      x: 0.0779166667,
      y: -0.9275,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512241,
      emotion_id: 3011,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 511921,
      question: null,
      emotion: "Lost",
      x: 0.2140657719,
      y: -0.1759331785,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 17:00:00",
      log_id: 512281,
      emotion_id: 2165,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Good",
      x: -0.6670533841,
      y: 0.2868760387,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510721,
      emotion_id: 1405,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Enlightened",
      x: -0.937951337,
      y: -0.3074092765,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510761,
      emotion_id: 1354,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Inspired",
      x: -0.6969824884,
      y: -0.5815477513,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510801,
      emotion_id: 1347,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Hopeful",
      x: -0.3857340734,
      y: -0.5489460003,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510841,
      emotion_id: 1430,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Calm",
      x: -0.2829779962,
      y: 0.9695951231,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510881,
      emotion_id: 1761,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Potent",
      x: -0.7230763999,
      y: -0.3865026414,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510921,
      emotion_id: 1375,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Focused",
      x: -0.2915610206,
      y: -0.4644241495,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 510961,
      emotion_id: 54168,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Bored",
      x: 0.0445833333,
      y: 0.8245833333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 18:30:00",
      log_id: 511641,
      emotion_id: 3013,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Happy",
      x: -0.925,
      y: -0.4575,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 22:00:00",
      log_id: 511521,
      emotion_id: 1353,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Harmonised",
      x: -0.7866666667,
      y: 0.2766666667,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 22:00:00",
      log_id: 511601,
      emotion_id: 336241,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Tight",
      x: 0.2180697252,
      y: -0.2013607071,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511001,
      emotion_id: 2781,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Thoughtful",
      x: -0.1004781495,
      y: 0.0602458733,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511041,
      emotion_id: 1499,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 503001,
      question: null,
      emotion: "Peculiar",
      x: 0.0621943691,
      y: 0.2126049408,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511121,
      emotion_id: 2739,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 402601,
      question: null,
      emotion: "Conscientious",
      x: -0.2265092826,
      y: 0.6241920519,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-19 23:00:00",
      log_id: 511481,
      emotion_id: 2986,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Lost",
      x: 0.2140657719,
      y: -0.1759331785,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 18:30:00",
      log_id: 512601,
      emotion_id: 2165,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Restless",
      x: 0.0459416949,
      y: -0.5441211173,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 18:30:00",
      log_id: 512641,
      emotion_id: 2132,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Bored",
      x: 0.0445833333,
      y: 0.8245833333,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 18:30:00",
      log_id: 512681,
      emotion_id: 3013,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 504801,
      question: null,
      emotion: "Anxiety",
      x: 0.0925,
      y: -0.8375,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 18:30:00",
      log_id: 512721,
      emotion_id: 54250,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Energized",
      x: -0.5477475437,
      y: -0.8104979926,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 22:00:00",
      log_id: 512561,
      emotion_id: 1821,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 500041,
      question: null,
      emotion: "Grateful",
      x: -0.6811156492,
      y: 0.1968447178,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 22:00:00",
      log_id: 512801,
      emotion_id: 1403,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Roused",
      x: -0.055,
      y: -0.2025,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512361,
      emotion_id: 54243,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 503001,
      question: null,
      emotion: "Indecisive",
      x: 0.0752526785,
      y: 0.0907813395,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512401,
      emotion_id: 2899,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 503001,
      question: null,
      emotion: "Reliable",
      x: -0.4081677556,
      y: -0.2001568772,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512441,
      emotion_id: 1804,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 503001,
      question: null,
      emotion: "Calm",
      x: -0.2829779962,
      y: 0.9695951231,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512481,
      emotion_id: 1761,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Enthusiastic",
      x: -0.6944852267,
      y: -0.8274904837,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-20 23:00:00",
      log_id: 512841,
      emotion_id: 1336,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Hopeful",
      x: -0.3857340734,
      y: -0.5489460003,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-21 23:00:00",
      log_id: 512881,
      emotion_id: 1430,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Engrossed",
      x: -0.2116666667,
      y: 0.20125,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-21 23:00:00",
      log_id: 513321,
      emotion_id: 1731,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 90721,
      question: null,
      emotion: "Lifted",
      x: -0.6966671214,
      y: -0.449926486,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-22 23:00:00",
      log_id: 513401,
      emotion_id: 2973,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 497201,
      question: null,
      emotion: "Agitated",
      x: 0.1773464726,
      y: -0.956259246,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-22 23:00:00",
      log_id: 513441,
      emotion_id: 54173,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    },
    {
      user_id: 503001,
      question: null,
      emotion: "Alert",
      x: -0.2378772965,
      y: -0.4982868831,
      "FROM_UNIXTIME(custom_view_emotion_log.date)": "2021-08-22 23:00:00",
      log_id: 513561,
      emotion_id: 1466,
      ethnicity: null,
      gender: null,
      highest_education_achieved: null,
      device_data: null
    }
  ];

  const xAccessor = (d) => d.x;
  const yAccessor = (d) => d.y;
  const cAccessor = (d) => d.freq;
  const rAccessor = (d) => 1;
  // should be min count of emotions
  const minFreq = d3.min(data, function (d) {
    return d.freq;
  });
  // should be count of emotions
  const maxFreq = d3.max(data, function (d) {
    return d.freq;
  });

  // function freqData(data) {
  //     return data[2];
  //   };

  const lineGenerator = d3.line();
  // const formatxAxis = d3.format(".3r");
  // const dimensions = this.Chart();
  // Add X axis
  const x = d3
    .scaleLinear()
    .domain([-1, 1]) // min and max value for the axes
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(" + 0 + "," + height / 2 + ")")
    .call(
      d3
        .axisTop(x) //location of ticks
        // .tickFormat(formatxAxis)
        // .ticks(4)
        .tickSize(0)
        .tickValues([0])
        .tickFormat("")
    );

  // Add Y axis
  const y = d3.scaleLinear().domain([-1, 1]).range([height, 0]);
  svg
    .append("g") // g for group
    .attr("transform", "translate(" + width / 2 + "," + 0 + ")")
    // .call(d3.axisRight(y).tickFormat(formatxAxis).ticks(10));
    .call(
      d3
        .axisRight(y) //location of ticks
        // .tickFormat(formatxAxis)
        // .ticks(4)
        .tickSize(0)
        .tickValues([0])
        .tickFormat("")
    );

  const boxDataGeneratorFunc = (data) => data.map((e) => [x(e[0]), y(e[1])]);

  // compute the density data
  const densityData = d3
    .contourDensity()
    .x(function (d) {
      return x(d.x);
    }) // x and y = column name in input data
    .y(function (d) {
      return y(d.y);
    })
    .size([width, height])
    .bandwidth(15)(data);
  // const freqData = [1, 3, 4, 1, 5];
  // console.log(freqData);
  //  const color = d3
  //   .scaleQuantize()
  //   .domain([minFreq, maxFreq]) // min=1; max=5
  //   // .domain([-1, 1])
  //   // .interpolate(d3.interpolateTurbo(0,1));
  //   .range(["yellow", "green", "pink", "blue"]);
  // const color = d3 //to be
  //   .scaleSequential(d3.interpolateTurbo)
  //   .domain([minFreq, maxFreq]);

  // const color = d3
  //   .scaleSequential()
  //   // .domain(d3.extent(data, cAccessor));
  //   .interpolator(d3.interpolateTurbo) //calculates range auto

  //   .domain([-4 * (1 / minFreq), 18]); //equation to be calculated for domain
  // const color = d3 //taken from other project
  //   .scaleLinear()
  //   .domain([minFreq, maxFreq])
  //   .interpolate(d3.interpolateHcl)
  //   .range(["blue", "#f79e1b"]);
  // var colorArray = (['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850']).reverse();
  var colorArray = [
    "#2d69f8",
    "#4499f7",
    "#4499f7",
    "#5bc9f6",
    "#72faf5",
    "#73f792",
    "#f6fa3b",
    "#f09a2e",
    "#eb3b22"
  ];
  var step = d3
    .scaleLinear()
    .domain([1, 15]) //8 steps of color
    .range([1, 15]); // range of frequency values

  var color = d3
    .scaleLinear()
    .domain([
      -1,
      step(2),
      step(3),
      step(4),
      step(5),
      step(6),
      step(7),
      step(8),
      step(9),
      step(10),
      step(11),
      step(12),
      step(13),
      step(14),
      1
    ])
    .range(colorArray);

  svg
    .append("g")
    .selectAll("path")
    .data(densityData)
    .join("path")
    .attr("fill", (d, i) => color(i))
    .call(x, y)

    .attr("d", d3.geoPath());

  var xAxis = d3
    .scaleLinear()
    .domain([-1, 1]) // min and max value for the axes
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(" + 0 + "," + height / 2 + ")")
    .call(
      d3
        .axisTop(x) //location of ticks
        // .tickFormat(formatxAxis)
        // .ticks(4)
        .tickSize(0)
        .tickValues([0])
        .tickFormat("")
    )
    .selectAll("path")
    .style("stroke", "white")
    .style("stroke-width", 2);
  var yAxis = d3.scaleLinear().domain([-1, 1]).range([height, 0]);
  svg
    .append("g") // g for group
    .attr("transform", "translate(" + width / 2 + "," + 0 + ")")
    .call(
      d3
        .axisRight(y) //location of ticks
        // .tickFormat(formatxAxis)
        // .ticks(4)
        .tickSize(0)
        .tickValues([0])
        .tickFormat("")
    )
    .selectAll("path")
    .style("stroke", "white")
    .style("stroke-width", 2);

  // xAxis.selectAll("path")
  //   .style("stroke", "purple");

  svg.append("g").call(yAxis).call(xAxis);
  //draw rectangle outside charts extremes to cut off blobs
  // var rectData = [
  //   [{x0:- margin.left,x1:width + margin.left + margin.right}],
  //   [{}]
  // ]
  // svg
  // .selectAll("rect")
  // .data(rectData)
  // .enter()
  // .append('path')
  // .attr('d', areaFunc)
  // .attr('class', 'absences area')
  // .attr('style', 'fill:blue;stroke:none;stroke-width:1');

  // .append('rect')
  // .attr('x', - margin.left)
  // .attr('y', - margin.top)
  // .attr('width', width + margin.left + margin.right)
  // .attr('height', margin.top)
  // // .attr('stroke', 'black')
  // .attr('fill', '#191f45')

  // svg
  // .append('rect')
  // .attr('x', - margin.left)
  // .attr('y', - margin.top)
  // .attr('width', margin.left)
  // .attr('height', height + margin.top + margin.bottom)
  // // .attr('stroke', 'black')
  // .attr('fill', '#191f45');

  // svg
  // .append('rect')
  // .attr('x', width + margin.right)
  // .attr('y', - margin.top)
  // .attr('width', margin.right)
  // .attr('height', height + margin.top + margin.bottom)
  // // .attr('stroke', 'black')
  // .attr('fill', '#191f45');

  // svg
  // .append('rect')
  // .attr('x', width + margin.right)
  // .attr('y', - margin.top)
  // .attr('width', margin.right)
  // .attr('height', height + margin.top + margin.bottom)
  // // .attr('stroke', 'black')
  // .attr('fill', '#191f45');
};

