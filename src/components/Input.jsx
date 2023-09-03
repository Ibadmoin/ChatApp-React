import React from 'react'
import { useState } from 'react'
import './CSS/theme.css'


export default function Input(props) {

    
  return (
    <input type={props.type || 'text'}
    placeholder={props.placeholder || ''}
    value={props.value || ''}
    onChange={props.onChange}
    disabled={props.disabled || false}
    className={`theme-input ${props.className || ''}`} 
    style={props.style || {}}
    id={props.id || ''}
    name={props.name || ''}
    required={props.required || false}
    maxLength={props.maxLength || null}
    minLength={props.minLength || null}
    autoFocus={props.autoFocus || false}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    onKeyDown={props.onKeyDown}/>

  )
}
