/** Public references supplied by the owner; these do not establish backend availability. */
export const workReferences = {
  cvvid: { label: "CVVID", url: "https://www.cvvid.com/" },
  tsl: { label: "Think Study Learn", url: "https://thinkstudylearn.com/" },
  fitcoin: { label: "Fitcoin showcase", url: "https://fitcoin-client.webflow.io/" },
  xceltube: { label: "XcelTube", url: "https://www.xceltube.com/" },
  supplyed: { label: "SupplyED prototype", url: "https://supplyed.vercel.app/" },
  pherrix: { label: "Pherrix", url: "https://new-website-sigma-ashy.vercel.app/" },
  cell: { label: "Cell Operative", url: "https://www.celloperative.se/" },
  visa: { label: "Online Visa System", url: "https://visa.idnmo.com/" },
} as const;

export type WorkReferenceId = keyof typeof workReferences;
