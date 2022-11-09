import {Entity, model, property} from '@loopback/repository';

@model()
export class Games extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  hours_played: string;


  constructor(data?: Partial<Games>) {
    super(data);
  }
}

export interface GamesRelations {
  // describe navigational properties here
}

export type GamesWithRelations = Games & GamesRelations;
