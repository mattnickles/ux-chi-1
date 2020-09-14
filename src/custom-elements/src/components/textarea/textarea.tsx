import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import { LUX_STATES, LuxStates } from '../../constants/states';
import { ICON_COLORS, IconColors } from '../../constants/color';
import { TEXT_INPUT_SIZES, TextInputSizes } from '../../constants/size';

@Component({
  tag: 'lux-textarea',
  styleUrl: 'textarea.scss',
  scoped: true
})

export class Textarea {
  @Element() el: HTMLLuxTextareaElement;
  /**
   * To define state color of Textarea
   */
  @Prop({ reflect: true }) state: LuxStates;
  /**
   * To add a left positioned icon
   */
  @Prop({ reflect: true }) iconLeft: string;
  /**
   * To add a right positioned icon
   */
  @Prop({ reflect: true }) iconRight: string;
  /**
   * To define color of left icon
   */
  @Prop({ reflect: true }) iconLeftColor: IconColors;
  /**
   * To define color of right icon
   */
  @Prop({ reflect: true }) iconRightColor: IconColors;
  /**
   * To define size of Textarea
   */
  @Prop({ reflect: true }) size ?: TextInputSizes = 'md';
  /**
   * To read value of Textarea
   */
  @Prop({ attribute: null, mutable: true }) value = '';
  /**
   * To define name of Textarea
   */
  @Prop({ reflect: true }) name: string;
  /**
   * To disable Textarea
   */
  @Prop({ reflect: true }) disabled = false;
  /**
   * To define -hover, -focus statuses
   */
  @Prop() _status: '-hover' | '-focus';
  /**
   * Triggered when an alteration to the element's value is committed by the user
   */
  @Event({ eventName: 'luxChange' }) eventChange: EventEmitter<string>;
  /**
   * Triggered when the user changed the element's value but did not commit the change yet
   */
  @Event({ eventName: 'luxInput' }) eventInput: EventEmitter<string>;
  /**
   * Triggered when the user sets focus on the element.
   */
  @Event({ eventName: 'luxFocus' }) eventFocus: EventEmitter;
  /**
   * Triggered when the element has lost focus.
   */
  @Event({ eventName: 'luxBlur' }) eventBlur: EventEmitter;

  @Watch('state')
  stateValidation(newValue: LuxStates) {
    const validValues = LUX_STATES.join(', ');

    if (newValue && !LUX_STATES.includes(newValue)) {
      throw new Error(`${newValue} is not a valid state for textarea. If provided, valid values are: ${validValues}. `);
    }
  }

  @Watch('size')
  sizeValidation(newValue: TextInputSizes) {
    const validValues = TEXT_INPUT_SIZES.join(', ');

    if (newValue && !TEXT_INPUT_SIZES.includes(newValue)) {
      throw new Error(`${newValue} is not a valid size for textarea. If provided, valid values are: ${validValues}. `);
    }
  }

  colorValidation(newValue: IconColors) {
    const validValues = ICON_COLORS.join(', ');

    if (newValue && !ICON_COLORS.includes(newValue)) {
      throw new Error(`${newValue} is not a valid color for icon. If provided, valid values are: ${validValues}. `);
    }
  }

  @Watch('iconLeftColor')
  iconLeftColorValidation(newValue: IconColors) {
    this.colorValidation(newValue);
  }

  @Watch('iconRightColor')
  iconRightColorValidation(newValue: IconColors) {
    this.colorValidation(newValue);
  }

  _handleValueInput(valueChange: Event) {
    this.value = (valueChange.target as HTMLInputElement).value;
    this.eventInput.emit(this.value);
  }

  _handleValueChange() {
    this.eventChange.emit(this.value);
  }

  componentWillLoad() {
    this.value = this.el.textContent;
    this.stateValidation(this.state);
    this.iconLeftColorValidation(this.iconLeftColor);
    this.iconRightColorValidation(this.iconRightColor);
    this.sizeValidation(this.size);
  }

  render() {
    const textareaElement = <textarea
      class={
        `lux-input
        ${this.state ? `-${this.state}` : ''}
        ${this.size ? `-${this.size}` : ''}
        ${this._status ? `-${this._status}` : ''}
        `}
      name={this.name || ''}
      disabled={this.disabled}
      id={this.el.id ? `${this.el.id}-control` : null}
      onFocus={() => this.eventFocus.emit()}
      onBlur={() => this.eventBlur.emit()}
      onInput={(ev) => this._handleValueInput(ev)}
      onChange={() => this._handleValueChange()}
    ><slot></slot></textarea>;
    const iconClasses = `
      ${this.iconLeft ? '-icon--left' : ''}
      ${this.iconRight ? '-icon--right' : ''}
    `;
    const iconLeft = this.iconLeft && <lux-icon color={this.iconLeftColor || null} icon={this.iconLeft} />;
    const iconRight = this.iconRight && <lux-icon color={this.iconRightColor || null} icon={this.iconRight} />;

    const textarea = this.iconLeft || this.iconRight ?
      <div class={`lux-input__wrapper ${iconClasses}`}>
        {textareaElement}
        {iconLeft}
        {iconRight}
      </div> : textareaElement;

    return textarea;
  }
}
