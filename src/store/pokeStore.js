import _ from 'lodash';
import {makeAutoObservable, toJS} from 'mobx';

const BASE_API = 'https://pokeapi.co/api/v2/';

/** Mapping between stats and associated eMoji*/
export const statIconMap = {
  attack: '⚔️',
  hp: '❤️',
  'special-attack': '🔮',
  defense: '🛡',
  speed: '⚡️',
  'special-defense': '✨',
};
const PAGINATION_LIMIT = 10;

const queryPaginate = (lim = PAGINATION_LIMIT, offset) =>
  '?limit=' + lim + (offset ? '&offset=' + offset : '');

/**Generic fetching API defaults to*/
export const fetchAPI = async ({
  url,
  endpoint = 'pokemon',
  baseURL = BASE_API,
  pag = false,
  query = queryPaginate(),
  param,
}) => {
  try {
    const URL = url || baseURL + endpoint; /*query + (param ? param : ''))*/
    const res = await fetch(URL);
    const result = await res.json();
    console.log('Fetch', URL, result);
    return result;
  } catch (error) {
    console.error(URL, error);
  }
};

export const PokemonStore = ({url, name, extra, imgs}) =>
  makeAutoObservable({
    url: url,
    name: name,
    loading: false,
    extra: extra,
    imgs: imgs,
    async fetchPokemon() {
      this.loading = true;
      const data = await fetchAPI({endpoint: this.url});
      this.imgs = Object.values(data?.sprites).filter(item => !!item);
      console.log('got this,', url, this.imgs, data.sprites);
      this.loading = false;
      return toJS(this);
    },
  });

export const PokeStore = () =>
  makeAutoObservable({
    list: [],
    count: 0,
    nextUrl: '',
    prevUrl: '',
    loading: false,
    currentPokemon: null,
    setCurrentPokemon(pokemon) {
      this.currentPokemon = pokemon;
    },
    pagIndex: 0,
    showModal: false,
    setModal(visible = false) {
      this.showModal = visible;
    },
    search: '',
    setSearch(newSearch) {
      console.log('this', newSearch);
      this.search = newSearch;
    },
    clearSearch() {
      this.search = '';
    },
    get filterList() {
      return this.search.length > 0
        ? this.list.filter(({name}) => name.includes(this.search.toLowerCase()))
        : this.list;
    },
    async fetchList(paginate = true) {
      this.loading = true;
      /*if (paginate) {this.pagIndex++;}*/
      const {count, next, previous, results} = await fetchAPI(
        !_.isEmpty(this.nextUrl) && {url: this.nextUrl},
      );
      this.list = paginate ? this.list.concat(results) : results;
      this.count = count;
      this.prevUrl = previous;
      this.nextUrl = next;
      this.loading = false;
    },
  });
