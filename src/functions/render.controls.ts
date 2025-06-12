import { ControlDictionary, EControls } from "../types/common.types";

import { BasicAutocompleteFields } from "../controls.basics/autocomplete.generic";
import { BasicCheckFields } from "../controls.basics/check.generic";
import { BasicCustomComponent } from "../controls.basics/custom-component.generic";
import { BasicDateFields } from "../controls.basics/date.generic";
import { BasicNumberFields } from "../controls.basics/number.generic";
import { BasicRadioFields } from "../controls.basics/radio.generic";
import { BasicRatingFields } from "../controls.basics/rating.generic";
import { BasicSelectFields } from "../controls.basics/select.generic";
import { BasicSliderFields } from "../controls.basics/slider.generic";
import { BasicSwitchFields } from "../controls.basics/switch.generic";
import { BasicTextFields } from "../controls.basics/input.generic";
import { BasicTimeFields } from "../controls.basics/time.generic";
import { ScannerGeneric } from "../controls.special/scanner.generic";

export function getControl(type: EControls) {
  return DICTIONARY[type];
}

const DICTIONARY: ControlDictionary = {
  number: BasicNumberFields,
  select: BasicSelectFields,
  multiselect: BasicSelectFields,
  autocomplete: BasicAutocompleteFields,
  date: BasicDateFields,
  time: BasicTimeFields,
  check: BasicCheckFields,
  switch: BasicSwitchFields,
  slider: BasicSliderFields,
  text: BasicTextFields,
  radio: BasicRadioFields,
  rating: BasicRatingFields,
  component: BasicCustomComponent,
  scanner: ScannerGeneric,
};
