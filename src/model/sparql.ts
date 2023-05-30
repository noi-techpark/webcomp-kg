// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface IRI {
  'type': 'uri';
  'value': string;
}

export interface StringLiteral {
  'type': 'literal';
  'value': string;
}

export interface LangStringLiteral {
  'type': 'literal';
  'value': string;
  'xml:lang': string;
}

export interface TypedLiteral {
  'type': 'literal';
  'value': string;
  'datatype': string;
}

export interface BlankNode {
  'type': 'bnode';
  'value': string;
}

export type Literal = StringLiteral | LangStringLiteral | TypedLiteral;
export type RdfTerm = IRI | Literal | BlankNode;

export type SolutionMapping = Record<string, RdfTerm>;

export interface SelectResultSet {
  head: {
    vars: string[]
  };
  results: {
    'bindings': SolutionMapping[]
  };
}
