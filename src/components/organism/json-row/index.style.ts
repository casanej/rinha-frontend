import { css, styled } from "styled-components";

const jsonRowTypeColor = {
  string: '#f5a623',
  number: '#4a90e2',
  boolean: '#7ed321',
  null: '#9b9b9b',
  object: '#f8e71c',
  endObject: '#f8e71c',
  array: '#50e3c2',
  endArray: '#50e3c2',
} as const;

export type JsonRowTypeColors = keyof typeof jsonRowTypeColor;

export const JsonRowContainer = styled.div<{ type: JsonRowTypeColors; depth: number }>`


  ${props => props.depth >= 1 && css`
    margin-left: ${Math.max(0, props.depth - 1) * 20}px;
    padding-left: ${props.depth + 1 * 20}px;
  `}

  label {
    &:nth-child(1) {
      color: #4E9590;
    }

    &:nth-child(2) {
      color: ${props => jsonRowTypeColor[props.type] || 'white'};
    }
  }
`;