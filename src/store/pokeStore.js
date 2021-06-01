import { makeAutoObservable, toJS } from 'mobx';

const BASE_API = 'https://pokeapi.co/api/v2/';

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
  'pokemon?limit=' + lim + (offset ? '&offset=' + offset : '');

export const fetchAPI = async ({
  endpoint,
  baseURL = BASE_API,
  query = queryPaginate(),
  param,
}) => {
  try {
    const URL = '' + (endpoint || baseURL + query + (param ? param : ''));
    const res = await fetch(URL);
    return await res.json();
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
    async fetchList(end = false) {
      this.loading = true;
      end && this.pagIndex++;
      const pokemons = await fetchAPI(
        end && {
          query: queryPaginate(
            PAGINATION_LIMIT,
            PAGINATION_LIMIT * this.pagIndex,
          ),
        },
      );
      this.list = end ? this.list.concat(pokemons.results) : pokemons.results;
      this.loading = false;
    },
    async fetchPokemon() {},
  });
