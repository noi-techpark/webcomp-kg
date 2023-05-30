// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import LibColor from 'color';
import colormap from 'colormap';
import _colorbrewer from 'colorbrewer';
import colorScales from 'colormap/colorScale';

const colorbrewer = {};
// postprocess colorbrower so we store the identifiers case insensitive.
// also make sure to only add 1 map per identifier (it has several maps, each with varying specificity)
for (const color in _colorbrewer) {
  if (_colorbrewer.hasOwnProperty(color)) {
    let mostSpecificScale = [];
    Object.entries(_colorbrewer[color]).forEach( scale => {
      if ((scale[1] as any[]).length > mostSpecificScale.length) {
        mostSpecificScale = scale[1] as any[];
      }
    });
    colorbrewer[color.toLowerCase()] = mostSpecificScale;
  }
}

function getHexFromScale(scaleType, scaleVal) {
  if (scaleVal > 1 || scaleVal < 0) { return; }
  if (!scaleType.length) { return; }
  let hexScale;
  if (colorbrewer[scaleType.toLowerCase()]) {
    // colorbrewer: http://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3
    hexScale = colorbrewer[scaleType.toLowerCase()];
  } else if (colorScales[scaleType]) {
    // colormap: https://github.com/bpostlethwaite/colormap
    hexScale = colormap({colormap: scaleType});
  }
  if (!hexScale || !hexScale.length) { return; }
  const index = Math.max(Math.round(scaleVal * hexScale.length) - 1, 0);
  return hexScale[index];
}

export function colorFromString(colorVal: string) {

  const scaleSettings = colorVal.split(',');

  if (scaleSettings.length === 2) {
    const colorFromScale = getHexFromScale(scaleSettings[0].trim(), scaleSettings[1].trim());
    if (colorFromScale) { colorVal = colorFromScale; }
  }
  try {
    return LibColor(colorVal);
  } catch (e) {
    // invalid color representation
    return LibColor('grey');
  }
  const defaultColor = '#2e6c97';
  return defaultColor;
}
