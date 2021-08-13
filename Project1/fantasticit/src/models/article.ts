import { getRecommend } from '@/services';
import { IArticleItem } from '@/types/article';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface ArticleModelState {
  recommend: IArticleItem[];
}

export interface ArticleModelType {
  namespace: 'article';
  state: ArticleModelState;
  effects: {
    getRecommend: Effect;
  };
  reducers: {
    save: Reducer<ArticleModelState>;
  };
}

const IndexModel: ArticleModelType = {
  namespace: 'article',

  state: {
    recommend: [],
  },

  effects: {
    *getRecommend({ payload }, { call, put}){
        let result = yield call(getRecommend);
        console.log('result...', result);
        if (result.statusCode === 200) {
            yield put({
                type: 'save',
                payload: {recommend: result.data}
            })
        }
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
};

export default IndexModel;