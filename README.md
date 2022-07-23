# EventsSchedule.js

A simple but flexible way to create an auto-updating schedule of events.

## Features

- Pulls data from a JSON file
- Indicates live (happening now) events
- Indicates when events are about to start
- Removes past events
- Allows events to be filtered by tag
- Shows event times either in the users' local time (default behaviour) or in a specified time zone
- Lightweight (less than 9KB of vanilla JavaScript)
- Configurable (see demos and options below)

## Demo

https://jw82uk.github.io/events-schedule-js/

## About

### Background

I created this script at the beginning of the COVID-19 pandemic when my organisation's planned in-person events needed to go virtual and an online schedule was required. The script was originally developed for a specific use case and fulfilled its purpose, but I thought that, with the addition of some extra configuration options, it might still be useful for others.

### Future

 I am not actively developing this at present, but I will endeavour to fix bugs if and when reported.

 ### License

 MIT License. See the included LICENSE.txt file for full details.

 ### Disclaimer

Test this script thoroughly before using it in a production site. There is no guarantee that it is bug free. I shall not be held liable for any claim. You use this software at your own risk.


## Basic setup

Create a container element for your event schedule and give it an ID. Optionally, add some fallback content like in the example below.

```html
<div id="my-events-schedule">
    <p><strong>Whoops! It looks like something has gone wrong.</strong></p>
    <p>Try refreshing the page but if this message persists then perhaps your web browser is too old or JavaScript is disabled.</p>
</div>
```

Add the base CSS to the `<head>` of your page. This is just the bare minimum CSS for the event schedule to work correctly, you'll need to add your own for styling purposes.


```html
<link rel="stylesheet" href="path/to/css/events-schedule-base.css">
```

Add the JavaScript near the bottom of the page, above the `</body>` tag.

```html
<script src="path/to/js/events-schedule.min.js"></script>
```

Populate a JSON file with your event data in the following format. The example below has two events.

**Important**: For the event start and end times, remember to specify the GMT offset correctly for your region. This can be easily forgotten, especially when a region uses daylight saving time and the GMT offset changes throughout the year. For example, in the UK, event start/end times that occur during Greenwich Mean Time should have a GMT offset of `GMT+0000`. But event start/end times that occur during British Summer Time should have a GMT offset of `GMT+0100`.

```json
{
    "events": [
        {
            "event_title": "Ut excepturi impedit vel Quis",
            "event_start": "Feb 08 2022 11:30:00 GMT+0000",
            "event_end": "Feb 08 2022 12:30:00 GMT+0000",
            "event_desc_html": "<p>Ut excepturi impedit vel Quis saepe eos consectetur atque in modi beatae. In enim unde id iste autem et voluptas amet At tempore pariatur quo unde galisum quo voluptatibus nihil vel architecto voluptas? Ea maxime dolorem ea culpa fuga sit quas optio aut dolore consectetur ut nostrum distinctio et voluptas voluptatem.</p>",
            "event_type": "Workshop",
            "primary_link_text": "Enim unde...",
            "primary_link_aria_label": "",
            "primary_link_url": "#",
            "secondary_link_text": "Join now",
            "secondary_link_aria_label": "",
            "secondary_link_url": "#",
            "tags": [
                "arts",
                "entertainment"
            ],
            "img_path": "/dist/img/arts/arts3.jpg",
            "img_alt": "Close up of woman's face",
            "custom_class": ""
        },
        {
            "event_title": "A voluptas fugiat rem fugit enim sit",
            "event_start": "April 08 2022 10:30:00 GMT+0100",
            "event_end": "April 08 2022 12:00:00 GMT+0100",
            "event_desc_html": "<p>A voluptas fugiat rem fugit enim sit repellendus quisquam. Et dolor debitis et perferendis cupiditate aut sint dolorem et animi rerum quo mollitia aut iure iure 33 quasi internos. Quo dolorem perferendis id perferendis quis quo voluptatem quod cum animi itaque ab omnis omnis qui quibusdam dignissimos ut tempore asperiores.</p>",
            "event_type": "Seminar",
            "primary_link_text": "Enim unde...",
            "primary_link_aria_label": "",
            "primary_link_url": "#",
            "secondary_link_text": "Join now",
            "secondary_link_aria_label": "",
            "secondary_link_url": "#",
            "tags": [],
            "img_path": "/dist/img/arts/arts4.jpg",
            "img_alt": "Abstract art",
            "custom_class": ""
        }
    ]
}
```

Finally, add the JavaScript to create the event schedule. At the very least you will need to include two things, the ID of your container element and the path to your JSON file.

```html
<script>
    window.addEventListener('load', function () {
        eventSchedule({
            container_id: 'my-events-schedule',
            json_path: 'path/to/json/events.json'
        });
    }
</script>
```

### Filtering

If you'd like your events schedule to be filterable, first ensure that each event in the JSON file has one or more tags in the `tags` array (see the JSON example above).

Next, add a `<select>` element to your page ensuring that it has an ID and that each `<option>` has a value that corresponds to one of your tags. 

```html
<label for="events-select">I'm interested in </label>
<select id="events-select" name="events-select">
    <option value>All events</option>
    <option value="arts">Arts</option>
    <option value="entertainment">Entertainment</option>
    <option value="nature">Nature</option>
    <option value="science">Science</option>
    <option value="technology">Technology</option>
</select>
```
Finally, populate the `filter_id` and `query_string_key` options.

```html
<script>
    window.addEventListener('load', function () {
        eventSchedule({
            container_id: 'my-events-schedule',
            json_path: 'path/to/json/events.json',
            filter_id: 'events-select', // The ID of your <select> element
            query_string_key: 'interest' // A word you'd like to use in the URL query string
        });
    }
</script>
```

## Options

These are all of the options available and their default values.

```html
<script>
    window.addEventListener('load', function () {

        eventSchedule({
            auto_update_time: 0, // INTEGER | In seconds, how often should the events reload? Setting to 0 disables auto update. 
            container_id: '', // STRING | the ID of the container element (without the # e.g. 'events-container')
            descriptor_current_event: 'Live now', // STRING | How should events that are currently happening be described?
            descriptor_starting_soon: 'Starting soon', // STRING | How should events that are starting soon be described?
            events_wrapper_class: '', // STRING | Optionally add one or more CSS classes to the events wrapper element. This is useful if you'd like to, for example, integrate with a carousel plugin which requires a unique class to identify the carousel wrapper element
            events_wrapper_html_element: 'ul', // STRING | A valid HTML element (e.g. ul, ol, div etc.)
            events_html_element: 'li', // STRING | A valid HTML element (e.g. li, div, article etc.)
            events_heading_level: 'h3', // STRING | Set the appropriate HTML heading level for event headings (e.g. h1, h2, h3 etc.)
            filter_id: '', // STRING | If you want to provide a <select> menu to filter events, this is the ID that you give the select menu e.g. 'events-select'
            img_loading: 'lazy', // STRING | Specify the native loading attribute for images. Set to 'lazy' for lazy loading,  'eager' for no lazy loading.
            json_path: '', // STRING | Path (URL) to the JSON file
            max_events: 100, // INTEGER | Max number of events to display
            no_events_msg_html: '<p class="events-schedule__no-events-msg">There are no events to display.</p>', // STRING | Modify as appropriate. If not required, leave empty ('') and no message will display
            only_events_tagged: [], // ARRAY | If you provide an array of tags (e.g. ['cats', 'dogs', 'birds']), then only the events with one or more of those tags will display
            order_chronological: true, // BOOLEAN | If false, events are ordered as they are in the JSON file
            query_string_key: '', // STRING | If you want the events to be filterable (based on tags) then you need to provide a unique key for the url's query string. The query string will comprise a key (i.e. the word you choose for query_string_key) and a value (i.e. a tag name). For example, the url www.webpage.com?interest=arts will only show events tagged with 'arts' if the query_string_key is 'interest'. 
            show_descriptions: true, // BOOLEAN
            show_event_types: true, // BOOLEAN
            show_images: true, // BOOLEAN
            show_live_events: true, // BOOLEAN | Show events that are happening now?
            show_no_of_events_msg: true, // BOOLEAN | This is the line that reads, for example, 'Showing 3 events'
            show_primary_links: true, // BOOLEAN | The first link for that event, if populated in the JSON file
            show_secondary_links: true, // BOOLEAN | The second link for that event, if populated in the JSON file
            show_tags_on_events: true, // BOOLEAN
            show_upcoming_events: true, // BOOLEAN | Show events that are upcoming?
            starting_soon_mins: 15, // INTEGER | How many minutes before the start time should an event be considered as starting soon? Set to 0 to disable this.
            time_format_minute: 'numeric', // STRING | Must be a standard JavaScript minute format value
            time_format_hour: 'numeric', // STRING | Must be a standard JavaScript hour format value
            time_format_hour12: false, // BOOLEAN | Set to true for 12 hour clock, false for 24 hour clock
            time_format_day: '2-digit', // STRING | Must be a standard JavaScript day format value
            time_format_month: 'short', // STRING | Must be a standard JavaScript month format value
            time_format_year: 'numeric', // STRING | Must be a standard JavaScript year format value
            time_locales: [], // ARRAY | Must be standard JavaScript date/time locales (e.g. 'en-GB' or 'en-US' etc.). This affects how dates and times are formatted. The default value of an empty array will mean the browser's default locale will be used.
            time_zone: '', // STRING | An IANA time zone name e.g. 'Europe/London' or 'America/New_York' etc. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List This will force the event times to display in the specified time zone and NOT in the users' local time zone. Leave empty ('') to default to the users' local time zone. Do NOT specify a time zone if you need to support IE 11.
            timezone_abbr: '', // STRING | If an IANA time zone has been specified, optionally include a time zone abbreviation (e.g. BST or EST) which will be appended to the event times. Leave this blank ('') if an IANA time zone has NOT been specified.
            timezone_msg_html: '<p class="events-schedule__timezone-msg">All event times are in your local time</p>', // STRING | Modify as appropriate. If not required, leave empty ('') and no message will display.
            afterEventsLoad: function () { }, // FUNCTION | A callback function to run each time the event schedule gets created (or recreated if auto update is enabled or if the event schedule gets filtered). This won't get called if there are no events to display.
        });
    }
</script>
```
## Browser support

If you don't specify a IANA time zone in the `time_zone` option, this script should have good browser support as far back as IE 11.

If you do specify a IANA time zone in the `time_zone` option,  this script won't work in Internet Explorer because IE doesn't support IANA time zone names in the `timeZone` option of `Date.prototype.toLocaleDateString()`. However, it should work in all modern web browsers.

## FAQs

### Why are the event times showing incorrectly?

The first thing to check is whether you have specified the correct GMT offset for the event's date/time (see the JSON section of the basic setup instructions).