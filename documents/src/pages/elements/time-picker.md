<!--
type: page
title: Time Picker
location: ./elements/time-picker
layout: default
language_tabs: [javascript, typescript]
-->

# Time Picker

::
```javascript
::time-picker::
```
```css
div {
  display: flex;
}
ef-time-picker:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-time-picker value="12:30"></ef-time-picker>
  <ef-time-picker></ef-time-picker>
  <ef-time-picker value="12:30:17"></ef-time-picker>
  <ef-time-picker value="12:30" am-pm></ef-time-picker>
</div>
```
::

This element allows users to input time and can be adjusted to show either a 12 or 24 hour format.

## Usage

A fixed time can be set by configuring attributes/properties.

::
```javascript
::time-picker::
```
```css
div {
  display: flex;
}
ef-time-picker:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-time-picker></ef-time-picker>
  <ef-time-picker value="12:30"></ef-time-picker>
  <ef-time-picker hours="12" minutes="30"></ef-time-picker>
</div>
```
::

```html
<ef-time-picker></ef-time-picker>
<ef-time-picker value="12:30"></ef-time-picker>
<ef-time-picker hours="12" minutes="30"></ef-time-picker>
```

*> Valid time formats are `hh:mm` and `hh:mm:ss`. This component does not support milliseconds.

## Setting current time

You can set the current time using native `Date` object methods.

::
```javascript
::time-picker::
const date = new Date();
const localTimePicker = document.getElementById("local-time");
const utcTimePicker = document.getElementById("utc-time");

localTimePicker.hours = date.getHours();
localTimePicker.minutes = date.getMinutes();
utcTimePicker.hours = date.getUTCHours();
utcTimePicker.minutes = date.getUTCMinutes();
```
```css
div {
  display: flex;
}
ef-time-picker:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-time-picker id="local-time"></ef-time-picker>
  <ef-time-picker id="utc-time"></ef-time-picker>
</div>
```
::

```javascript
const date = new Date();
const localTimePicker = document.getElementById("local-time");
localTimePicker.hours = date.getHours();
localTimePicker.minutes = date.getMinutes();
```

Similarly, you can set current time in the UTC timezone.

```javascript
const date = new Date();
const utcTimePicker = document.getElementById("utc-time");
utcTimePicker.hours = date.getUTCHours();
utcTimePicker.minutes = date.getUTCMinutes();
```

## Combining time and date

Typically, the time value must be combined with a date object in order to use an API. To do this, use methods on the native `Date` object.

```javascript
const date = new Date();
const timepicker = document.querySelector("ef-time-picker");
date.setHours(timepicker.hours);
date.setMinutes(timepicker.minutes);
date.setSeconds(timepicker.seconds);
```

```typescript
import { TimePicker } from '@refinitiv-ui/elements/time-picker';

const date = new Date();
const timepicker: TimePicker | null = document.querySelector('ef-time-picker');

if (timepicker && timepicker.hours !== null && timepicker.minutes !== null && timepicker.seconds !== null) {
  date.setHours(timepicker.hours);
  date.setMinutes(timepicker.minutes);
  date.setSeconds(timepicker.seconds);
}
```

This is useful when implementing `ef-time-picker` with `ef-calendar`.

::
```javascript
::time-picker::

const calendar = document.querySelector("ef-calendar");
const timePicker = document.querySelector("ef-time-picker");
calendar.addEventListener("value-changed", () => {
  if (calendar.value && timePicker.value) {
    const date = new Date(calendar.value);
    date.setHours(timePicker.hours);
    date.setMinutes(timePicker.minutes);
    date.setSeconds(timePicker.seconds);
    console.log(date.toLocaleString());
  }
}, true);
```
```html
<ef-calendar>
  <ef-time-picker slot="footer"></ef-time-picker>
</ef-calendar>
```
::


```html
<ef-calendar>
  <ef-time-picker slot="footer"></ef-time-picker>
</ef-calendar>
```

```javascript
const calendar = document.querySelector("ef-calendar");
const timePicker = document.querySelector("ef-time-picker");

calendar.addEventListener("value-changed", () => {
  if (calendar.value && timePicker.value) {
    const date = new Date(calendar.value);
    date.setHours(timePicker.hours);
    date.setMinutes(timePicker.minutes);
    date.setSeconds(timePicker.seconds);
    console.log(date.toLocaleString());
  }
}, true);
```

```typescript
import { Calendar } from '@refinitiv-ui/elements/calendar';
import { TimePicker } from '@refinitiv-ui/elements/time-picker';

const calendar: Calendar | null = document.querySelector("ef-calendar");
const timePicker: TimePicker | null = document.querySelector("ef-time-picker");

calendar?.addEventListener("value-changed", () => {
  if (calendar instanceof Calendar && timePicker instanceof TimePicker) {
    if (calendar.value && timePicker.value) {
      const date = new Date(calendar.value);
      timePicker.hours && date.setHours(timePicker.hours);
      timePicker.minutes && date.setMinutes(timePicker.minutes);
      timePicker.seconds && date.setSeconds(timePicker.seconds);
      
      console.log(date.toLocaleString());
    }
  }
}, true);
```

## Accessibility
::a11y-intro::

The hours and minutes inputs have independent labels hidden for assistive technologies. The input fields that form the Time Picker control are programmatically grouped and associated with their group label. States such as `disabled` or `readonly` are programmatically updated to match the visual state. 

`ef-time-picker` has already managed the role and states.

::a11y-end::
