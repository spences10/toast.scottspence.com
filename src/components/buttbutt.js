/** @jsx h */
import { h } from 'preact'

/**
 * Looks like you have reached the bottom of this post
 * Bummer
 * Ok, well, now that's behind you maybe you'd like to share this
 * Is it two cheeky for you
 * I know, what a half-arsed attempt at humour
 * I've got some cheek making that crack
 * You can leave that in the Rear-view
 * Like it? You can always take another crack at it?
 * Butt wait, there more!
 */

export const ButtButt = ({ height = 533, width = 849 }) => {
  const puns = [
    `Ok, well, now that's behind you maybe you'd like to share this`,
    `Is it two cheeky for you`,
    `I know, what a half-arsed attempt at humour`,
    `I've got some cheek making that crack`,
    `You can leave that in the Rear-view`,
    `Like it? You can always take another crack at it?`,
    `Butt wait, there more!`,
  ]
  const rando = puns[Math.floor(Math.random() * puns.length)]

  return (
    <div>
      <aside class="text-center mb-12">
        <p class="mb-6">
          Looks like you have reached the bottom of this page!
        </p>
      </aside>
      <div class="flex justify-center mb-12">
        <img
          src="https://res.cloudinary.com/defkmsrpw/image/upload/q_auto,f_auto/v1614936696/scottspence.com/buttbutt.png"
          alt="a cheeky butt"
          height={height}
          width={width}
        />
      </div>
      <aside class="text-center mb-20">
        <p class="mb-6">Bummer!</p>
        <p class="mb-6">{rando}</p>
      </aside>
    </div>
  )
}
