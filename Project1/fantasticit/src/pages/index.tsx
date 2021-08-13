import { IRootState } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const dispatch = useDispatch()
  const {recommend} = useSelector((state:IRootState)=>state.article);

  useEffect(() => {
    dispatch({
      type: 'article/getRecommend'
    })
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div>{
        recommend.map(item=>{
          return <li key={item.id}>
            <span>{item.title}</span>
          </li>
        })}</div>
    </div>
  );
}
