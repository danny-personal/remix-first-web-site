import stylesUrl from '~/style/article.css';

export const links = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Top20IndexRoute() {
  return (
    <article>
      <p>ここに記事が表示されます。</p>
      <p>左のメニューから記事を選択してください。</p>
    </article>
  )
}
