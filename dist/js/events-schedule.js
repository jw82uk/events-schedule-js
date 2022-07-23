"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Purpose: To display events from a JSON file
Version: 1.0
License: MIT
Credits: Yaphi Berhanu (get-url-params function, from Stack Overflow), Dominic P (update-query-string function, , from Stack Overflow)
*/
function eventSchedule(userSettings) {
  var defaultSettings = {
    auto_update_time: 0,
    // INTEGER | In seconds, how often should the events reload? Setting to 0 disables auto update. 
    container_id: '',
    // STRING | the ID of the container element (without the # e.g. 'events-container')
    descriptor_current_event: 'Live now',
    // STRING | How should events that are currently happening be described?
    descriptor_starting_soon: 'Starting soon',
    // STRING | How should events that are starting soon be described?
    events_wrapper_class: '',
    // STRING | Optionally add one or more CSS classes to the events wrapper element. This is useful if you'd like to, for example, integrate with a carousel plugin which requires a unique class to identify the carousel wrapper element
    events_wrapper_html_element: 'ul',
    // STRING | A valid HTML element (e.g. ul, ol, div etc.)
    events_html_element: 'li',
    // STRING | A valid HTML element (e.g. li, div, article etc.)
    events_heading_level: 'h3',
    // STRING | Set the appropriate HTML heading level for event headings (e.g. h1, h2, h3 etc.)
    filter_id: '',
    // STRING | If you want to provide a <select> menu to filter events, this is the ID that you give the select menu e.g. 'events-select'
    img_loading: 'lazy',
    // STRING | Specify the native loading attribute for images. Set to 'lazy' for lazy loading,  'eager' for no lazy loading.
    json_path: '',
    // STRING | Path (URL) to the JSON file
    max_events: 100,
    // INTEGER | Max number of events to display
    no_events_msg_html: '<p class="events-schedule__no-events-msg">There are no events to display.</p>',
    // STRING | Modify as appropriate. If not required, leave empty ('') and no message will display
    only_events_tagged: [],
    // ARRAY | If you provide an array of tags (e.g. ['cats', 'dogs', 'birds']), then only the events with one or more of those tags will display
    order_chronological: true,
    // BOOLEAN | If false, events are ordered as they are in the JSON file
    query_string_key: '',
    // STRING | If you want the events to be filterable (based on tags) then you need to provide a unique key for the url's query string. The query string will comprise a key (i.e. the word you choose for query_string_key) and a value (i.e. a tag name). For example, the url www.webpage.com?interest=arts will only show events tagged with 'arts' if the query_string_key is 'interest'. 
    show_descriptions: true,
    // BOOLEAN
    show_event_types: true,
    // BOOLEAN
    show_images: true,
    // BOOLEAN
    show_live_events: true,
    // BOOLEAN | Show events that are happening now?
    show_no_of_events_msg: true,
    // BOOLEAN | This is the line that reads, for example, 'Showing 3 events'
    show_primary_links: true,
    // BOOLEAN | The first link for that event, if populated in the JSON file
    show_secondary_links: true,
    // BOOLEAN | The second link for that event, if populated in the JSON file
    show_tags_on_events: true,
    // BOOLEAN
    show_upcoming_events: true,
    // BOOLEAN | Show events that are upcoming?
    starting_soon_mins: 15,
    // INTEGER | How many minutes before the start time should an event be considered as starting soon? Set to 0 to disable this.
    time_format_minute: 'numeric',
    // STRING | Must be a standard JavaScript minute format value
    time_format_hour: 'numeric',
    // STRING | Must be a standard JavaScript hour format value
    time_format_hour12: false,
    // BOOLEAN | Set to true for 12 hour clock, false for 24 hour clock
    time_format_day: '2-digit',
    // STRING | Must be a standard JavaScript day format value
    time_format_month: 'short',
    // STRING | Must be a standard JavaScript month format value
    time_format_year: 'numeric',
    // STRING | Must be a standard JavaScript year format value
    time_locales: [],
    // ARRAY | Must be standard JavaScript date/time locales (e.g. 'en-GB' or 'en-US' etc.). This affects how dates and times are formatted. The default value of an empty array will mean the browser's default locale will be used.
    time_zone: '',
    // STRING | An IANA time zone name e.g. 'Europe/London' or 'America/New_York' etc. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List This will force the event times to display in the specified time zone and NOT in the users' local time zone. Leave empty ('') to default to the users' local time zone. Do NOT specify a time zone if you need to support IE 11.
    timezone_abbr: '',
    // STRING | If an IANA time zone has been specified, optionally include a time zone abbreviation (e.g. BST or EST) which will be appended to the event times. Leave this blank ('') if an IANA time zone has NOT been specified.
    timezone_msg_html: '<p class="events-schedule__timezone-msg">All event times are in your local time</p>',
    // STRING | Modify as appropriate. If not required, leave empty ('') and no message will display.
    afterEventsLoad: function afterEventsLoad() {} // FUNCTION | A callback function to run each time the event schedule gets created (or recreated if auto update is enabled or if the event schedule gets filtered). This won't get called if there are no events to display.

  }; // Merge user provided settings with default settings

  var settings = _objectSpread(_objectSpread({}, defaultSettings), userSettings); // Date and time settings


  var dateFormat = {
    day: settings.time_format_day,
    month: settings.time_format_month,
    year: settings.time_format_year
  };
  var timeFormat = {
    hour12: settings.time_format_hour12,
    hour: settings.time_format_hour,
    minute: settings.time_format_minute
  };
  var dateTimeFormat = {
    day: settings.time_format_day,
    month: settings.time_format_month,
    year: settings.time_format_year,
    hour12: settings.time_format_hour12,
    hour: settings.time_format_hour,
    minute: settings.time_format_minute
  };
  var locale = settings.time_locales;
  var timezone = settings.time_zone; // Insert time zone, if one has been specified, into date and time objects

  if (timezone) {
    dateFormat.timeZone = timezone;
    timeFormat.timeZone = timezone;
    dateTimeFormat.timeZone = timezone;
  } // Events holders


  var eventsObj = {};
  var allEvents = ''; // Event counters

  var pastEventsCount = 0;
  var presentEventsCount = 0;
  var futureEventsCount = 0;
  var relevantEventsCount = 0; // Value of the URL parameter

  var urlParamValue = ''; // Events container element

  var eventsContainer = document.getElementById(settings.container_id); // Create an XMLHttpRequest object

  var theEvents = new XMLHttpRequest(); // Create a callback function

  theEvents.onreadystatechange = function () {
    // 'status' checks the status of the server
    if (theEvents.readyState === 4 && theEvents.status === 200) {
      // CREATE OBJECT FROM JSON
      // Convert JSON string into a JavaScript object and store in 'eventsObj' variable
      eventsObj = JSON.parse(theEvents.responseText); // Create the events schedule

      createEventSchedule(); // Update the select menu

      updateSelectMenu();
    }
  }; // Open a request


  theEvents.open('GET', settings.json_path + '?' + Math.random()); // Random number added to prevent caching
  // Send the request

  theEvents.send(); // CREATE EVENT SCHEDULE

  function createEventSchedule() {
    // ##############################################################
    // DETERMINE STATUS OF EVENTS
    // Is each event in the past, present, or future?
    // ##############################################################
    var todayDate = new Date(); // let todayDate = new Date('Sat Oct 24 2020 12:32:00 GMT+0100 (British Summer Time)'); // FOR TESTING PURPOSES ONLY

    var todayDateUTC = todayDate.toUTCString();
    var currrentTime = new Date(todayDateUTC).getTime(); // Determine the status (past, present, future) of each event in eventsObj. 
    // Add an appropriate event status key/value pair to the event, and update counters.

    for (var i = 0; i < eventsObj.events.length; i++) {
      var eventStartTime = new Date(eventsObj.events[i].event_start).getTime();
      var eventEndTime = new Date(eventsObj.events[i].event_end).getTime();
      var startingSoonMs = settings.starting_soon_mins * 60 * 1000; // Past events

      if (eventStartTime < currrentTime && eventEndTime < currrentTime) {
        eventsObj.events[i].event_status = 'past';
        pastEventsCount++;
      } // Future events 
      else if (eventStartTime > currrentTime && eventEndTime > currrentTime) {
        eventsObj.events[i].event_status = 'future';
        futureEventsCount++;
      } // Present events 
      else if (eventStartTime <= currrentTime && eventEndTime >= currrentTime) {
        eventsObj.events[i].event_status = 'present';
        presentEventsCount++;
      } // Add a 'start_time_ms' key/value (for chronological ordering)


      eventsObj.events[i].start_time_ms = eventStartTime; // Add a 'duration_ms' key/value (for chronological ordering)

      eventsObj.events[i].duration_ms = eventEndTime - eventStartTime; // Is the event starting soon?

      if (startingSoonMs) {
        // Add a 'starting_soon' key/value
        if (eventStartTime - currrentTime < startingSoonMs && eventStartTime - currrentTime > 0) {
          eventsObj.events[i].starting_soon = true;
        } else {
          eventsObj.events[i].starting_soon = false;
        }
      }
    } // ##############################################################
    // IDENTIFY RELEVANT EVENTS
    // Identify which events are/aren't relevant to the user 
    // based on the URL parameter (e.g. ?interest=arts)
    // ##############################################################
    // Set/reset all events to not relevant


    for (var _i = 0; _i < eventsObj.events.length; _i++) {
      eventsObj.events[_i].relevant = false;
    } // CHECK 1 - Should only certain tagged events show? 
    // If so...


    if (settings.only_events_tagged.length) {
      // Check if events contain 1 or more of the tags specified in the user settings
      settings.only_events_tagged.forEach(function (element) {
        // For each user specified tag, loop through the events
        for (var _i2 = 0; _i2 < eventsObj.events.length; _i2++) {
          // Get the index position of the tag (-1 means the event doesn't contain that tag)
          var indexOfTag = eventsObj.events[_i2].tags.indexOf(element); // If the event is NOT already set to relevant (it may have been if there are multiple tags to check)
          // AND it does contain the tag we're checking for


          if (!eventsObj.events[_i2].relevant && indexOfTag > -1) {
            // Set relevance to true
            eventsObj.events[_i2].relevant = true;
          }
        }
      });
    } // But if all events should show (i.e. not just events containing particular tags)
    else {
      // Make all events relevant
      for (var _i3 = 0; _i3 < eventsObj.events.length; _i3++) {
        eventsObj.events[_i3].relevant = true;
      }
    } // CHECK 2 - Should the events be filtered based on the URL query string?
    // Get the current value assigned to query_string_key from the URL


    urlParamValue = getAllUrlParams()[settings.query_string_key]; // If a query_string_key has been specified, and it has a value

    if (settings.query_string_key && urlParamValue) {
      // Loop through events
      for (var _i4 = 0; _i4 < eventsObj.events.length; _i4++) {
        // Get the index position of the tag that matches the value
        // (this will be -1 if the event doesn't contain a tag that matches)
        var indexOfUrlParam = eventsObj.events[_i4].tags.indexOf(urlParamValue); // If the event is already marked as relevant (from check 1 above)
        // AND does NOT contain the relevant tag (i.e. index position of -1)


        if (eventsObj.events[_i4].relevant && indexOfUrlParam < 0) {
          // Set relevance to false
          eventsObj.events[_i4].relevant = false;
        }
      }
    } // CHECK 3 - should all events show?
    // If a query string key AND specific tags have NOT been provided in the user settings


    if (!settings.query_string_key && settings.only_events_tagged.length === 0) {
      // Make all events relevant
      for (var _i5 = 0; _i5 < eventsObj.events.length; _i5++) {
        eventsObj.events[_i5].relevant = true;
      }
    } // ##############################################################
    // LOAD ALL EVENTS
    // Output the events onto the page
    // ##############################################################
    // Max number of events allowed to load


    var maxEvents = settings.max_events; // Reset relevant events count

    relevantEventsCount = 0; // Events container

    allEvents = ''; // If necessary, order events chronologically

    if (settings.order_chronological) {
      // Sort events by duration
      eventsObj.events.sort(function (a, b) {
        return a.duration_ms - b.duration_ms;
      }); // Sort events by start time

      eventsObj.events.sort(function (a, b) {
        return a.start_time_ms - b.start_time_ms;
      });
    } // If there are present or future events


    if (presentEventsCount || futureEventsCount) {
      for (var _i6 = 0; _i6 < eventsObj.events.length; _i6++) {
        // If present (live) events should show
        if (settings.show_live_events) {
          if (eventsObj.events[_i6].event_status == 'present' && eventsObj.events[_i6].relevant == true && relevantEventsCount < maxEvents) {
            allEvents += buildEvent(_i6); // Increment counter

            relevantEventsCount++;
          }
        } // If future (upcoming) events should show


        if (settings.show_upcoming_events) {
          if (eventsObj.events[_i6].event_status == 'future' && eventsObj.events[_i6].relevant == true && relevantEventsCount < maxEvents) {
            allEvents += buildEvent(_i6); // Increment counter

            relevantEventsCount++;
          }
        }
      }
    } // ADD CLASS TO CONTAINER ELEMENT


    eventsContainer.classList.add('events-schedule'); // OUTPUT EVENT SCHEDULE

    if (relevantEventsCount > 0) {
      var output = '';
      var eventsWrapperElement = settings.events_wrapper_html_element; // If the number of results should display

      if (settings.show_no_of_events_msg) {
        if (relevantEventsCount == 1) {
          output += '<p class="events-schedule__count">Showing ' + relevantEventsCount + ' event</p>';
        } else if (relevantEventsCount > 1) {
          output += '<p class="events-schedule__count">Showing ' + relevantEventsCount + ' events</p>';
        }
      } // If timezone message should display


      if (settings.timezone_msg_html) {
        output += settings.timezone_msg_html;
      } // Output the relevant events


      output += '<' + eventsWrapperElement + ' class="events-schedule__events-wrapper';

      if (settings.events_wrapper_class) {
        output += ' ' + settings.events_wrapper_class;
      }

      output += '">' + allEvents + '</' + eventsWrapperElement + '>';
      eventsContainer.innerHTML = output; // User defined callback function to run after events load

      settings.afterEventsLoad();
    } else if (settings.no_events_msg_html) {
      eventsContainer.innerHTML = settings.no_events_msg_html;
    } else {
      // This removes any no JS fallback content if you've added it into the container <div> 
      eventsContainer.innerHTML = '';
    } // ##############################################################
    // FADE IN EVENTS
    // Fade events in so that it's more obvious the events change when filtering.
    // Requires the opacity to initially be set to zero in the CSS.
    // ##############################################################


    setTimeout(function () {
      var eventSelector = '#' + settings.container_id + ' .events-schedule__event';
      var allEvents = document.querySelectorAll(eventSelector);

      for (var _i7 = 0; _i7 < allEvents.length; _i7++) {
        allEvents[_i7].classList.add('events-schedule__event--opaque');
      }
    }, 50);
  } //
  // AUTO UPDATE
  // Recreate the events periodically
  //


  if (settings.auto_update_time) {
    var time = settings.auto_update_time * 1000;
    setInterval(createEventSchedule, time);
  } // 
  // BUILD EVENTS
  // eventPos is the index position of the event in eventsObj
  // 


  function buildEvent(eventPos) {
    var eventStart = new Date(eventsObj.events[eventPos].event_start);
    var eventEnd = new Date(eventsObj.events[eventPos].event_end);
    var eventHolder = '';
    var eventElement = settings.events_html_element;
    var headingLevel = settings.events_heading_level;
    eventHolder += '<' + eventElement + ' class="events-schedule__event events-schedule__event--' + eventsObj.events[eventPos].event_status + ' events-schedule__event--starting-soon-' + eventsObj.events[eventPos].starting_soon; // Add event type class

    if (eventsObj.events[eventPos].event_type) {
      eventHolder += ' events-schedule__event--' + eventsObj.events[eventPos].event_type.toLowerCase().replace(/\s/g, '') + ' ';
    } // Add custom class


    if (eventsObj.events[eventPos].custom_class) {
      eventHolder += ' ' + eventsObj.events[eventPos].custom_class + ' ';
    }

    eventHolder += '">'; // If images should show AND the event has an image

    if (settings.show_images && eventsObj.events[eventPos].img_path) {
      eventHolder += '<div class="events-schedule__img-wrapper"><img class="events-schedule__img" src="' + eventsObj.events[eventPos].img_path + '" alt="' + eventsObj.events[eventPos].img_alt + '" loading="' + settings.img_loading + '" /></div>';
    } // Begin text wrapper


    eventHolder += '<div class="events-schedule__details">'; // Add title

    eventHolder += '<' + headingLevel + ' class="events-schedule__title">' + eventsObj.events[eventPos].event_title + '</' + headingLevel + '>'; // Date, time, and status (live or upcoming)

    eventHolder += '<p class="events-schedule__time">'; // If event is on one day

    if (eventStart.toLocaleDateString(locale, dateFormat) == eventEnd.toLocaleDateString(locale, dateFormat)) {
      eventHolder += '<time datetime="' + eventStart.toLocaleString(locale, dateTimeFormat) + '">' + eventStart.toLocaleDateString(locale, dateFormat) + ', ' + eventStart.toLocaleTimeString(locale, timeFormat) + '</time> <span aria-hidden="true">-</span><span class="sr-only">Until</span> <time datetime="' + eventEnd.toLocaleString(locale, dateTimeFormat) + '">' + eventEnd.toLocaleTimeString(locale, timeFormat) + '</time>';
    } // If event covers multiple days 
    else {
      eventHolder += '<time datetime="' + eventStart.toLocaleString(locale, dateTimeFormat) + '">' + eventStart.toLocaleDateString(locale, dateFormat) + ', ' + eventStart.toLocaleTimeString(locale, timeFormat) + '</time> <span aria-hidden="true">-</span><span class="sr-only">Until</span> <time datetime="' + eventEnd.toLocaleString(locale, dateTimeFormat) + '">' + eventEnd.toLocaleDateString(locale, dateFormat) + ', ' + eventEnd.toLocaleTimeString(locale, timeFormat) + '</time>';
    } // Append optional time zone abbreviation


    if (settings.timezone_abbr) {
      eventHolder += ' ' + settings.timezone_abbr;
    }

    eventHolder += '</p>'; // If event is starting soon

    if (eventsObj.events[eventPos].starting_soon) {
      eventHolder += '<p class="events-schedule__status events-schedule__status--soon">' + settings.descriptor_starting_soon + '</p>';
    } // If event is happening now


    if (eventsObj.events[eventPos].event_status == 'present' && settings.descriptor_current_event) {
      eventHolder += '<p class="events-schedule__status events-schedule__status--live">' + settings.descriptor_current_event + '</p>';
    } // Add event type


    if (settings.show_event_types && eventsObj.events[eventPos].event_type) {
      eventHolder += '<p class="events-schedule__type">' + eventsObj.events[eventPos].event_type + '</p>';
    } // Add description


    if (settings.show_descriptions && eventsObj.events[eventPos].event_desc_html) {
      eventHolder += '<div class="events-schedule__description">' + eventsObj.events[eventPos].event_desc_html + '</div>';
    } // Add event tags 


    if (settings.show_tags_on_events && eventsObj.events[eventPos].tags.length) {
      var eventTags = eventsObj.events[eventPos].tags;

      if (eventTags.length) {
        eventHolder += '<p class="events-schedule__tags">' + eventTags.join(', ') + '</p>';
      }
    } // Add primary link


    if (settings.show_primary_links && eventsObj.events[eventPos].primary_link_text) {
      eventHolder += '<a class="events-schedule__link events-schedule__link--primary" href="' + eventsObj.events[eventPos].primary_link_url + '" aria-label="' + eventsObj.events[eventPos].primary_link_aria_label + '">' + eventsObj.events[eventPos].primary_link_text + '</a>';
    } // Add secondary link


    if (settings.show_secondary_links && eventsObj.events[eventPos].secondary_link_text) {
      eventHolder += '<a class="events-schedule__link events-schedule__link--secondary" href="' + eventsObj.events[eventPos].secondary_link_url + '" aria-label="' + eventsObj.events[eventPos].secondary_link_aria_label + '">' + eventsObj.events[eventPos].secondary_link_text + '</a>';
    } // Close divs


    eventHolder += '</div></' + eventElement + '>';
    return eventHolder;
  } //
  // UPDATE SELECT MENU
  // Make sure the select menu shows the correct value, based on the URL query string (if any)
  //


  function updateSelectMenu() {
    urlParamValue = getAllUrlParams()[settings.query_string_key]; // If the url parameter key has a value

    if (urlParamValue) {
      document.getElementById(settings.filter_id).value = urlParamValue;
    }
  } //
  // WHEN SELECT MENU CHANGES (i.e. when the user filters the events)
  // Update the URL and recreate the events schedule
  //


  var eventsFilter = document.getElementById(settings.filter_id); // If a filter_id and query_string_key are specified

  if (eventsFilter && settings.query_string_key) {
    // Add an event listener onto the <select> menu
    eventsFilter.addEventListener('input', function () {
      // Update the URL
      var newUrl = update_query_string(window.location.href, settings.query_string_key, this.value);
      history.pushState({
        id: 'Event Schedule'
      }, 1, newUrl); // Recreate the events

      createEventSchedule();
    });
  }
  /*
  # GET ALL URL PARAMS
    Author: Yaphi Berhanu
  Link: https://www.sitepoint.com/get-url-parameters-with-javascript/
    This function allows easy access to URL parameters if you need to support legacy browsers that don't support the modern URLSearchParams interface.
    Usage examples:
      getAllUrlParams().product; // 'shirt'
      getAllUrlParams().color; // 'blue'
      getAllUrlParams().newuser; // true
      getAllUrlParams().nonexistent; // undefined
      getAllUrlParams('http://test.com/?a=abc').a; // 'abc'
  */


  function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1); // we'll store the parameters here

    var obj = {}; // if query string exists

    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0]; // split our query string into its component parts

      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('='); // set parameter name and value (use 'true' if empty)

        var paramName = a[0];
        var paramValue = typeof a[1] === 'undefined' ? true : a[1]; // (optional) keep case consistent

        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase(); // if the paramName ends with square brackets, e.g. colors[] or colors[2]

        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = []; // if it's an indexed array e.g. colors[2]

          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string') {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
  }
  /* 
  # UPDATE QUERY STRING 
    Author: https://stackoverflow.com/users/931860/dominic-p
  Source: https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter/23529943#23529943
    Add or update a query string parameter. If no URI is given, we use the current window.location.href value for the URI.
   
  Based on the DOM URL parser described here:
  http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
   
  @param   (string)    uri     Optional: The URI to add or update a parameter in
  @param   (string)    key     The key to add or update
  @param   (string)    value   The new value to set for key
   
  Tested on Chrome 34, Firefox 29, IE 7 and 11
  */


  function update_query_string(uri, key, value) {
    // Use window URL if no query string is provided
    if (!uri) {
      uri = window.location.href;
    } // Create a dummy element to parse the URI with


    var a = document.createElement('a'),
        // match the key, optional square brackets, an equals sign or end of string, the optional value
    reg_ex = new RegExp(key + '((?:\\[[^\\]]*\\])?)(=|$)(.*)'),
        // Setup some additional variables
    qs,
        qs_len,
        key_found = false; // Use the JS API to parse the URI 

    a.href = uri; // If the URI doesn't have a query string, add it and return

    if (!a.search) {
      a.search = '?' + key + '=' + value;
      return a.href;
    } // Split the query string by ampersands


    qs = a.search.replace(/^\?/, '').split(/&(?:amp;)?/);
    qs_len = qs.length; // Loop through each query string part

    while (qs_len > 0) {
      qs_len--; // Remove empty elements to prevent double ampersands

      if (!qs[qs_len]) {
        qs.splice(qs_len, 1);
        continue;
      } // Check if the current part matches our key


      if (reg_ex.test(qs[qs_len])) {
        // Replace the current value
        qs[qs_len] = qs[qs_len].replace(reg_ex, key + '$1') + '=' + value;
        key_found = true;
      }
    } // If we haven't replaced any occurrences above, add the new parameter and value


    if (!key_found) {
      qs.push(key + '=' + value);
    } // Set the new query string


    a.search = '?' + qs.join('&');
    return a.href;
  }
}