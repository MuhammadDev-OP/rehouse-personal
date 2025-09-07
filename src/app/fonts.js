import localFont from 'next/font/local'

// // Example for loading a custom font
// export const customFont = localFont({
//   src: [
//     {
//       path: '../fonts/ppneuemontreal-medium.otf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../fonts/ppneuemontreal-semibolditalic.otf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../fonts/ppneuemontreal-bold.otf',
//       weight: '700',
//       style: 'normal',
//     }
//   ],
//   variable: '--font-custom' // This creates a CSS variable that you can use
// })

export const ppNeueMontreal = localFont({
  src: [
    {
      path: '../fonts/ppneuemontreal-thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/ppneuemontreal-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-semibolditalic.otf',
      weight: '600',
      style: 'italic',
    }
  ],
  variable: '--font-pp-neue'
}) 

export const PPValve = localFont({
  src: [
      {
          path: '../fonts/PPValve-PlainMedium.otf',
          weight: '500',
          style: 'normal',
      },
      {
            path: '../fonts/PPValve-PlainExtrabold.otf',
          weight: '800',
          style: 'normal',
      },
  ],
  variable: '--font-ppvalve',
})

export const PPValveStencil = localFont({
  src: [
      {
          path: '../fonts/PPValve-StencilMedium.otf',
          weight: '500',
          style: 'normal',
      },
      {
          path: '../fonts/PPValve-StencilExtrabold.otf',
          weight: '800',
          style: 'normal',
      },
  ],
  variable: '--font-ppvalvestencil',
})