import { HeroList } from "../components/HeroList"

export const MarvelPage = () => {
  return (
    <>
      <h1 aria-label="marvel-title">Marvel</h1>
      <hr />
      <HeroList publisher="Marvel Comics" />
    </>
  )
}
