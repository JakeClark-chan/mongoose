# DSC-Easy-Color
<div align="center">
  <p>
<a href="https://nodei.co/npm/discord-color/"><img src="https://nodei.co/npm/discord-color.png">
</p>
    <br />
    <p>
<a href="https://github.com/aluffyz/discord-color"><img src="https://badge.fury.io/js/djs-red.svg" /></a>
<a href="https://deepscan.io/dashboard#view=project&tid=10962&pid=17363&bid=395840"><img src="https://deepscan.io/api/teams/10962/projects/17363/branches/395840/badge/grade.svg" alt="DeepScan grade"></a>
  </p>
</div>

# Description
Makes getting HEX and RGB values for colors easy with over 130 colors
[List of colors](https://github.com//discord-color/blob/master/src/listofcolors.json) 
# Example
```javascript
const EasyRed = require("discord-color")

EasyRed.getColor(TYPE, COLOR) //Returns RGB or HEX value for color
EasyRed.getRandomColor(TYPE) //Returns random RGB or HEX value
EasyRed.getRandomGen(TYPE) //Returns randomly generated color with HEX or RGB value
```
