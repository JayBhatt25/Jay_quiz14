import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Games} from '../models';
import {GamesRepository} from '../repositories';

export class GamesController {
  constructor(
    @repository(GamesRepository)
    public gamesRepository : GamesRepository,
  ) {}

  @post('/games')
  @response(200, {
    description: 'Games model instance',
    content: {'application/json': {schema: getModelSchemaRef(Games)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Games, {
            title: 'NewGames',
            exclude: ['id'],
          }),
        },
      },
    })
    games: Omit<Games, 'id'>,
  ): Promise<Games> {
    return this.gamesRepository.create(games);
  }

  @get('/games/count')
  @response(200, {
    description: 'Games model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Games) where?: Where<Games>,
  ): Promise<Count> {
    return this.gamesRepository.count(where);
  }

  @get('/games')
  @response(200, {
    description: 'Array of Games model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Games, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Games) filter?: Filter<Games>,
  ): Promise<Games[]> {
    return this.gamesRepository.find(filter);
  }

  @patch('/games')
  @response(200, {
    description: 'Games PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Games, {partial: true}),
        },
      },
    })
    games: Games,
    @param.where(Games) where?: Where<Games>,
  ): Promise<Count> {
    return this.gamesRepository.updateAll(games, where);
  }

  @get('/games/{id}')
  @response(200, {
    description: 'Games model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Games, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Games, {exclude: 'where'}) filter?: FilterExcludingWhere<Games>
  ): Promise<Games> {
    return this.gamesRepository.findById(id, filter);
  }

  @patch('/games/{id}')
  @response(204, {
    description: 'Games PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Games, {partial: true}),
        },
      },
    })
    games: Games,
  ): Promise<void> {
    await this.gamesRepository.updateById(id, games);
  }

  @put('/games/{id}')
  @response(204, {
    description: 'Games PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() games: Games,
  ): Promise<void> {
    await this.gamesRepository.replaceById(id, games);
  }

  @del('/games/{id}')
  @response(204, {
    description: 'Games DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gamesRepository.deleteById(id);
  }
}
