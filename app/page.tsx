"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Globe, ChevronRight, Clock, Award, Briefcase } from 'lucide-react';
// Inline SVGs for the tech-stack grid — avoids pulling in the entire
// react-icons/si barrel (3,000+ icons → 10 MB+ build artefact).
const TechSVG = ({ children, ...props }: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={20} height={20} {...props}>{children}</svg>
);
const SiNextdotjs = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></TechSVG>;
const SiReact = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.235 0 .431.048.596.14.893.517 1.199 2.805.675 5.63l-.108.568-.526-.146c-.88-.244-1.827-.44-2.818-.59l-.584-.087-.34-.527c-.56-.873-1.167-1.67-1.795-2.38l-.427-.487.543-.373c1.38-.947 2.7-1.448 3.784-1.448zm-4.255 2.54c.442.499.88 1.076 1.303 1.722l-2.605.001c.422-.645.862-1.22 1.302-1.723zm-6.048-1.54c1.078 0 2.396.5 3.777 1.448l.543.374-.427.487c-.628.71-1.235 1.507-1.795 2.38l-.34.527-.584.087a26.378 26.378 0 0 0-2.818.59l-.526.146-.108-.568c-.52-2.826-.214-5.113.679-5.629.163-.093.36-.142.599-.142zm3.96 4.89c.78-.007 1.573.027 2.35.1l.393.037-.213.336c-.438.693-.87 1.44-1.287 2.24l-.165.322-.319-.13a23.88 23.88 0 0 1-2.163-1.052l-.368-.212.307-.254c.404-.335.82-.638 1.242-.9l.223-.094zm-1.27.63c-.276.17-.547.35-.812.543l1.62.717c-.265-.425-.534-.843-.808-1.26zM8.43 9.88c-.27.42-.535.843-.797 1.27l.012-.006 1.619-.717a15.07 15.07 0 0 0-.834-.547zm7.143 0c-.288.173-.567.356-.834.547l1.62.717-.013.006c-.262-.427-.528-.85-.773-1.27zm-3.572.001.024.003c-.004 0-.01.003-.024.003zm0 0c.014 0 .02-.003.024-.003l-.024.003zm-7.143.25.011-.003c.47.283.963.55 1.472.8L4.6 9.88c-.6.85-1.132 1.713-1.566 2.568l-.076.15-.077-.15a13.61 13.61 0 0 1-.023-2.318zm14.286 0-.011-.003-.023 2.318-.077.15-.076-.15C16.924 11.593 16.39 10.73 15.79 9.88l-.74 1.047c.509-.25 1.003-.517 1.473-.8l.011.003zM4.26 12.496c-.005.084-.005.165-.005.248 0 1.097.119 2.157.34 3.166l.08.358-.345.127a21.048 21.048 0 0 1-2.208.614l-.468.09.115-.459c.453-1.797 1.384-3.416 2.491-4.144zm15.482 0c1.107.728 2.038 2.347 2.491 4.144l.115.459-.468-.09a21.048 21.048 0 0 1-2.208-.614l-.345-.127.08-.358c.22-1.009.34-2.069.34-3.166 0-.083 0-.164-.005-.248zm-8.743.625c.44.28.9.537 1.375.77l.145.068-.076.149-.762 1.516-.213.424-.21-.427-.753-1.508-.076-.15.146-.068c.474-.233.934-.49 1.424-.774zm-.998 1.009c.327.178.66.344.997.499l.001-.003c-.338-.154-.67-.32-.998-.496zm2.992-.496v.003c.337-.155.67-.32.997-.499-.328.176-.66.342-.997.496z"/></TechSVG>;
const SiTypescript = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></TechSVG>;
const SiNodedotjs = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M11.998.016C5.372.016 0 5.388 0 12.014c0 6.626 5.372 11.998 11.998 11.998 6.627 0 11.999-5.372 11.999-11.998C23.997 5.388 18.625.016 11.998.016zM6.497 18.577a.75.75 0 0 1-.375-.65v-7.29a.75.75 0 0 1 1.125-.65l5.997 3.645a.75.75 0 0 1 0 1.3L7.247 18.577a.75.75 0 0 1-.75 0zm10.752-3.645-5.997 3.645a.75.75 0 0 1-1.125-.65v-.65l4.872-2.995-4.872-2.995v-.65a.75.75 0 0 1 1.125-.65l5.997 3.645a.75.75 0 0 1 0 1.3z"/></TechSVG>;
const SiPostgresql = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.39.46 9.5.876a9.42 9.42 0 0 0-1.997-.296 10.25 10.25 0 0 0-2.238.208 9.956 9.956 0 0 0-1.421.376l-.087.03C1.69 2.128.338 4.335.074 7.22A20.234 20.234 0 0 0 0 9.28c.014 2.595.327 4.574.981 5.929.65 1.346 1.694 2.069 2.976 2.009.784-.036 1.51-.356 2.132-.92.467.35.992.53 1.528.576a3.3 3.3 0 0 0 1.688-.38l.04-.023c-.016.398-.029.75-.031.99v.017c-.002.396-.003.64.04.894.09.496.3.82.628 1.096.332.28.786.39 1.264.377.615-.017 1.366-.239 2.193-.547l.084-.031a7.484 7.484 0 0 0 1.037.08c.816 0 1.516-.24 2.022-.705.523-.478.75-1.163.7-1.926l-.01-.136a14.2 14.2 0 0 0-.12-.857c.44.13.826.136 1.157.037.51-.154.88-.516 1.179-.968.613-.916.97-2.362 1.042-4.304a7.555 7.555 0 0 0-.024-.725l.001-.075c.015-1.35.015-3.534-1.027-5.307C21.4 1.825 19.82.539 17.128 0zm-.35 1.502c2.357.49 3.706 1.575 4.52 3.013.898 1.55.898 3.553.885 4.877v.014a7.89 7.89 0 0 1 .023.661c-.066 1.73-.38 3.043-.88 3.828-.24.358-.476.556-.708.624-.234.07-.537.026-.939-.224a5.942 5.942 0 0 0-.26-.158c-.033-1.372-.347-2.261-.794-2.854.167-.165.327-.348.48-.55a6.516 6.516 0 0 0 .34-.564l.04-.08.036-.08c.287-.68.45-1.512.45-2.535 0-1.147-.209-2.047-.648-2.766a4.001 4.001 0 0 0-.11-.17c.266-1.12.192-2.18-.12-3.056zm-5.22.398c.356.012.703.072 1.03.173.17.053.32.114.462.176a4.93 4.93 0 0 0-.93 3.086c-.47.25-.91.59-1.3 1.015a6.748 6.748 0 0 0-.625.88c-.28-.5-.57-.91-.87-1.267a7.07 7.07 0 0 0-.596-.618c.247-.568.66-1.037 1.23-1.453.59-.433 1.293-.843 1.6-.992zm3.502.05c.292.75.33 1.689.015 2.734a3.887 3.887 0 0 0-.965-.457 7.19 7.19 0 0 0-.648-.16c.257-.71.633-1.306 1.069-1.792.17-.187.348-.36.53-.325zm-7.587.258a8.703 8.703 0 0 1 1.478.191 7.624 7.624 0 0 0-.408.37 8.34 8.34 0 0 0-.697.81c-.13.179-.245.365-.353.556a5.47 5.47 0 0 0-.748-.09c-.34-.02-.67-.01-.988.03-.127-.29-.3-.56-.51-.81a3.963 3.963 0 0 0-.32-.33 8.763 8.763 0 0 1 2.546-.727zM7.1 4.184a3.21 3.21 0 0 1 .82.65 2.47 2.47 0 0 1 .488.838c-.522.273-.97.622-1.316 1.02a4.36 4.36 0 0 0-.55.913 4.516 4.516 0 0 0-1.131-.213A8.636 8.636 0 0 1 5 7.36c-.098-.63-.08-1.22.067-1.735.14-.485.395-.897.788-1.22a3.84 3.84 0 0 1 1.245-.22zm11.088 3.234c0 .89-.135 1.59-.36 2.135l-.04.086a5.065 5.065 0 0 1-.27.46c-.283.42-.635.744-1.088.97-.453.229-.99.355-1.683.369-.44.008-.95.074-1.46.226a4.13 4.13 0 0 0-1.208.619 3.54 3.54 0 0 0-.795.876 3.34 3.34 0 0 0-.417 1.193c-.012.078-.017.156-.021.234a3.86 3.86 0 0 1-.247-.385c-.195-.37-.343-.87-.395-1.554-.052-.685-.012-1.559.173-2.651.224-1.32.672-2.176 1.268-2.74.594-.562 1.365-.876 2.337-.993.48-.058.868-.063 1.139-.07.27-.006.42-.016.576-.05.32-.068.574-.201.786-.39.21-.188.38-.432.54-.716.16-.285.308-.613.487-.96.022-.045.05-.086.075-.13.083.121.16.257.232.412.196.428.32 1.002.322 1.819v.02c0 .002 0 .004-.002.006zm-4.903 5.15c.063-.13.14-.244.234-.34.286-.302.688-.482 1.2-.6l.132-.029c.476-.099.944-.164 1.302-.17.744-.016 1.363-.146 1.9-.404.137.456.222.988.258 1.601.032.562.013 1.188-.077 1.862a8.184 8.184 0 0 1-.126.671c-.254.03-.51.019-.77-.028a5.148 5.148 0 0 1-.818-.24l-.068-.027c-.338-.14-.66-.284-.987-.36a2.34 2.34 0 0 0-.542-.055c-.326.003-.634.07-.92.194l-.112.054a2.498 2.498 0 0 1-.558.183 1.23 1.23 0 0 1-.41.004l-.068-.017a14.174 14.174 0 0 1-.019-.267 40.99 40.99 0 0 1 .05-2.03zm-5.987-7.48c.339.006.659.043.952.115.29.07.554.177.784.33.46.3.797.767.96 1.535.162.77.14 1.833-.125 3.256a19.808 19.808 0 0 0-.306 2.85c.042.645.176 1.218.42 1.693.033.063.068.126.104.187a2.13 2.13 0 0 1-1.006.282c-.348-.027-.698-.173-1.042-.502l-.031-.03-.034-.025c-.548-.405-.865-1.106-.87-2.083-.005-1.01.306-2.275.93-3.804l.014-.036.013-.039a4.66 4.66 0 0 0 .245-1.427c0-.626-.14-1.187-.41-1.666a2.53 2.53 0 0 0-.162-.246 2.905 2.905 0 0 1 .564-.39zm-2.4.8c.14.027.276.07.41.127.26.113.514.29.74.523.224.23.42.517.563.855.14.338.227.72.227 1.136 0 .432-.074.838-.196 1.194-.074.215-.162.41-.26.58-.16-.026-.33-.048-.502-.057-.175-.01-.352-.01-.527.002-.137-.334-.29-.71-.462-1.133-.172-.42-.364-.878-.57-1.38a3.906 3.906 0 0 0-.238-.46c.068-.373.182-.7.333-.972.153-.27.337-.48.555-.621.11-.073.226-.128.348-.155a.93.93 0 0 1 .38-.004l-.001.365zm11.39 7.14c.255.094.503.206.742.348.165.1.319.217.448.352.13.133.236.287.302.464.065.177.087.38.056.609-.08.591-.454 1.15-1.007 1.546-.312.218-.68.38-1.073.46.016-.095.03-.188.042-.28.094-.697.113-1.357.08-1.947a8.994 8.994 0 0 0-.282-1.773c.239.072.479.15.692.22zm-6.52 3.93c.176-.026.374-.022.592.027.242.055.494.162.753.284.26.122.527.259.807.372.28.11.573.205.878.248a3.91 3.91 0 0 0 .877.017l.02-.003a5.47 5.47 0 0 1-.047.415c-.06.383-.166.669-.323.848-.257.292-.632.418-1.13.418a5.965 5.965 0 0 1-.834-.063l-.037-.006-.037.01c-.745.23-1.42.447-1.956.562-.535.116-.9.121-1.13-.028-.165-.106-.27-.287-.326-.588-.036-.198-.033-.423-.031-.813v-.017c.002-.247.016-.614.033-1.037.144-.072.292-.16.44-.258.255-.166.49-.358.664-.564a1.49 1.49 0 0 0 .24-.38c.1.033.197.059.288.084l.067.018z"/></TechSVG>;
const SiAmazon = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.67-1.94 1.16-4.08 1.94-6.42 2.34-1.18.2-2.37.3-3.57.3-3.276 0-6.34-.73-9.196-2.18-.264-.14-.43-.3-.49-.48a.344.344 0 0 1 .01-.26zm.982-2.662c-.092-.14-.02-.252.14-.33l.51-.188c.146-.052.27-.04.36.046l.12.124c.94 1.068 2.07 1.898 3.39 2.49 1.61.71 3.38 1.064 5.3 1.064 2.06 0 3.97-.4 5.73-1.2l.41-.19c.115-.053.21-.06.29-.02.09.05.14.13.12.22-.02.08-.07.153-.156.215-.83.605-1.766 1.08-2.81 1.43-1.04.35-2.12.57-3.23.663-3.66.29-6.8-.58-9.42-2.62-.1-.08-.18-.17-.25-.26a3.01 3.01 0 0 1-.265-.35l-.23-.1zM13.31 6.098c0-1.955.47-3.52 1.42-4.698.94-1.177 2.22-1.766 3.83-1.766 1.21 0 2.21.38 3.01 1.14.79.76 1.19 1.74 1.19 2.95 0 .83-.2 1.58-.6 2.25-.4.67-.95 1.19-1.66 1.56.58.3 1.07.74 1.46 1.32.39.58.59 1.24.59 1.97 0 1.35-.4 2.42-1.19 3.19-.79.78-1.84 1.16-3.15 1.16-1.35 0-2.44-.4-3.27-1.19-.83-.8-1.25-1.88-1.25-3.25v-.33c.01-.14.06-.19.14-.19l1.86-.38c.22-.04.34.04.36.25l.02.29c0 .72.18 1.3.55 1.74.37.44.86.66 1.47.66.62 0 1.1-.21 1.44-.63.34-.42.51-.99.51-1.71 0-.69-.18-1.23-.52-1.63-.35-.39-.82-.59-1.41-.59l-.73.04c-.23.01-.34-.1-.34-.33v-1.6c0-.21.11-.32.33-.34l.62-.04c.54 0 .98-.18 1.3-.53.32-.35.48-.82.48-1.41 0-.56-.15-1-.44-1.32-.29-.32-.68-.48-1.16-.48-.52 0-.93.17-1.23.52-.3.35-.45.82-.45 1.42v.14c0 .22-.1.32-.32.32l-1.84-.23c-.2-.03-.3-.14-.3-.34zm-3.58-.73c-.94.95-1.41 2.26-1.41 3.94v.81c0 1.67.48 2.98 1.44 3.93.96.95 2.24 1.42 3.84 1.42 1.03 0 1.95-.23 2.76-.69.81-.46 1.44-1.1 1.88-1.92.44-.82.66-1.74.66-2.75 0-.43-.04-.8-.13-1.12-.28.39-.64.71-1.09.98l-.27.14c.03.2.05.4.05.6 0 .91-.22 1.64-.67 2.18-.45.54-1.06.81-1.83.81-.78 0-1.38-.28-1.81-.83-.43-.56-.64-1.32-.64-2.27v-.83c0-.97.2-1.72.6-2.26.4-.54.98-.81 1.75-.81.16 0 .31.01.45.04-.27-.32-.49-.7-.67-1.12a4.23 4.23 0 0 0-.68-.05c-1.6 0-2.87.47-3.82 1.43z"/></TechSVG>;
const SiFlutter = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L8.099 17.3l6.229 6.229h7.349l-6.229-6.229 6.229-6.229h-7.349z"/></TechSVG>;
const SiPython = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.26-.31.23-.38.2-.44.18-.51.15-.58.12-.64.1-.71.06-.77.04-.84.02-1.27-.05-1.06-.13-.91-.2-.73-.26-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></TechSVG>;
const SiDocker = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.184.184 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.184.186v1.887c0 .102.083.185.185.185m-2.974 2.232c-.534-.413-.729-1.636-.205-2.304a2.13 2.13 0 0 1 1.344-.786c.15-.024.303-.036.458-.036h17.11c.163 0 .324.013.482.04a2.13 2.13 0 0 1 1.334.785c.52.668.321 1.891-.213 2.305-.154.117-.328.207-.514.265-.007.002-.015.004-.022.005-.217.056-.44.079-.663.069l-.007.001c-.117-.006-.232-.018-.347-.038-1.04-.186-1.917-.847-2.592-1.624-.673.776-1.55 1.437-2.59 1.624-.207.036-.42.053-.633.054-.214-.001-.426-.018-.634-.054-1.04-.186-1.916-.848-2.59-1.624-.674.776-1.55 1.437-2.59 1.624-.207.036-.42.053-.633.054-.216-.001-.43-.018-.638-.054-1.04-.186-1.917-.848-2.59-1.624-.523.608-1.12 1.14-1.83 1.478-.292.138-.6.237-.914.29-.19.033-.383.048-.576.046a3.19 3.19 0 0 1-.464-.04 2.63 2.63 0 0 1-.502-.165 2.167 2.167 0 0 1-.378-.24z"/></TechSVG>;
const SiKubernetes = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005.485.606zm-.833-2.129l-2.616-.18a5.21 5.21 0 0 1 1.351-3.234l1.869 1.892-.067.085-.537 1.437zm-2.329 3.787c0-1.4.448-2.695 1.207-3.748l1.43 2.264a3.05 3.05 0 0 0-.484.735c-.087.196-.136.414-.136.643 0 .882.714 1.596 1.595 1.596.082 0 .163-.006.242-.018l-.063 2.67a5.231 5.231 0 0 1-3.791-4.142zm.848-8.83a5.171 5.171 0 0 1 3.148-1.69L11 7.48h-.008a3.046 3.046 0 0 0-1.19.636L7.89 7.178zm4.26 1.044l-.613-.803A3.054 3.054 0 0 0 9.39 9.487l-.004-.006L7.519 7.59a5.212 5.212 0 0 1 3.234-1.35l.397 1.932zm2.48-.842a5.172 5.172 0 0 1 2.077 2.597l-2.583.438-.003-.003-.484-.608.983-2.424zm.834 2.124l2.617.18a5.21 5.21 0 0 1-1.352 3.234l-1.869-1.892.064-.085.54-1.437zm-3.047-2.56a3.046 3.046 0 0 0-1.53.41L9.19 6.498a5.172 5.172 0 0 1 3.147 1.69l-1.921.936zm-2.218 4.374c0-.132.014-.26.04-.385.027-.12.065-.236.114-.346.098-.22.236-.42.404-.59.083-.083.173-.16.27-.228.186-.127.395-.218.62-.264.14-.028.283-.042.43-.042.147 0 .29.014.43.042.225.046.435.137.62.264.096.068.188.145.27.228.168.17.306.37.405.59.049.11.087.226.114.346.026.125.04.253.04.385 0 .898-.608 1.655-1.434 1.882a2.013 2.013 0 0 1-.447.05 2.009 2.009 0 0 1-.447-.05c-.825-.227-1.433-.984-1.433-1.882zm2.497 2.33l-.064.012-.064-.012.063.073-.063.073.125-.073zm.267-1.43c.088-.222.138-.464.138-.718 0-.254-.05-.496-.138-.718l1.43-2.267a5.25 5.25 0 0 1 1.04 3.22 5.25 5.25 0 0 1-1.04 3.22l-1.43-2.267a2.965 2.965 0 0 0 0-.47zm-.125 1.578l1.867 1.89a5.21 5.21 0 0 1-3.234 1.352l-.18-2.617.085-.064 1.462-.561zm-1.86 1.03l.18 2.617a5.21 5.21 0 0 1-3.234-1.352l1.869-1.892.086.064 1.099.563zm.854 3.617a5.231 5.231 0 0 1-3.791-4.14l2.628.441.007-.008.46.6-.001.002-.003.003-1 2.414a5.17 5.17 0 0 1-1.3.688zm3.792-4.14a5.231 5.231 0 0 1-3.792 4.14l-1-2.413-.003-.003-.001-.002.46-.601.007.008 2.628-.44a5.213 5.213 0 0 1-.3 2.31z"/></TechSVG>;
const SiGraphql = (p: React.SVGProps<SVGSVGElement>) => <TechSVG {...p}><path d="M14.051.886a2.25 2.25 0 0 0-4.102 0L8.118 3.14a2.25 2.25 0 0 0 .075 2.154L9.56 7.6l-1.04 1.8L6.76 8.248a2.25 2.25 0 0 0-2.154.075L2.352 9.95a2.25 2.25 0 0 0 0 3.896l2.254 1.628a2.25 2.25 0 0 0 2.154.075l1.76-1.154 1.04 1.8-1.366 2.307a2.25 2.25 0 0 0-.075 2.154l1.628 2.254a2.25 2.25 0 0 0 3.896 0l1.628-2.254a2.25 2.25 0 0 0-.075-2.154L13.83 16.395l1.04-1.8 1.76 1.154a2.25 2.25 0 0 0 2.154-.075l2.254-1.628a2.25 2.25 0 0 0 0-3.896l-2.254-1.627a2.25 2.25 0 0 0-2.154-.075L14.87 9.4l-1.04-1.8 1.366-2.307a2.25 2.25 0 0 0 .075-2.154L14.05.886zM12 3a.75.75 0 1 1 0-1.5A.75.75 0 0 1 12 3zm0 19.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM3 12a.75.75 0 1 1-1.5 0A.75.75 0 0 1 3 12zm19.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-5.25-6.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-8.25 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 13.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm8.25 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/></TechSVG>;
// NeuralBackground: client-only canvas — no SSR, defer loading so it never
// blocks the hero text from reaching the browser first.
const NeuralBackground = dynamic(() => import('../components/background/NeuralBackground'), { ssr: false });

// Below-fold sections: dynamically imported so they don't block the hero bundle.
// ProcessSection and FeaturedInsights are pure markup — enable SSR for them so
// they are included in the HTML payload and search engines can index them.
const WhatWeBuild = dynamic(() => import('@/components/sections/WhatWeBuild').then(m => ({ default: m.WhatWeBuild })), { ssr: false });
const WhyMeetechh = dynamic(() => import('@/components/sections/WhyMeetech'), { ssr: false });
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'), { ssr: true });
const FeaturedInsights = dynamic(() => import('@/components/sections/FeaturedInsights'), { ssr: false });
const MeetechCTA = dynamic(() => import('@/components/sections/CTA'), { ssr: false });
const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA').then(m => ({ default: m.FloatingCTA })), { ssr: false });
// Animation constants
const DURATION = 0.6;
const EASE = "easeOut";

// Trust Section Data
const TRUST_HEADLINE = "Trusted by Founders & Businesses Worldwide";

const TRUST_SIGNALS = [
  { label: "Delivery across time zones", icon: "globe" },
  { label: "Clear processes, no surprises", icon: "clock" },
  { label: "Built to scale with you", icon: "award" },
  { label: "Long-term partnerships", icon: "briefcase" },
];

const TRUST_ICONS: Record<string, React.ReactNode> = {
  globe: <Globe className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
};

export default function App() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.98]);
  const reduce = Boolean(useReducedMotion());

  return (
    <div className="relative min-h-screen w-full bg-bg-page text-text-primary selection:bg-accent selection:text-text-inverse overflow-hidden font-sans transition-colors duration-500">

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-default)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Hero Interactive Background */}
      <NeuralBackground />

      {/* Atmospheric Radial Blur */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-accent/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center"
      >
        <div className="max-w-6xl w-full">

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="group mb-12 inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-border-default bg-bg-surface/60 backdrop-blur-2xl cursor-default hover:border-accent/40 transition-all shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <p className="text-[11px] md:text-xs font-bold tracking-[0.25em] uppercase text-text-muted">
              Scaling Innovation &middot; USA &middot; Global
            </p>
            <ChevronRight className="w-3.5 h-3.5 text-accent" />
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] mb-10 text-text-primary"
          >
            Where Ideas <br />
            <span className="text-accent bg-clip-text">
              Meet Technology
            </span>
          </motion.h1>

          {/* Credibility Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-text-body mb-14 leading-relaxed font-light"
          >
            <span className=' font-bold'>Meetech Development</span> architects high-performance digital ecosystems and production-grade products for enterprises requiring absolute reliability and global scale.
          </motion.p>

          {/* CTA Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/services"
              className="group relative px-10 py-5 bg-accent text-text-inverse font-bold rounded-xl overflow-hidden transition-all hover:bg-accent-hover hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.4)] active:scale-95 inline-flex items-center justify-center"
            >
              <span className="relative flex items-center gap-2">
                Explore Solutions <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="px-10 py-5 bg-transparent border-2 border-border-strong hover:bg-bg-subtle hover:border-accent text-text-primary font-bold rounded-xl transition-all active:scale-95 inline-flex items-center justify-center"
            >
              Consult Our Engineers
            </Link>
          </motion.div>


        </div>
      </motion.section>

      {/* Infinite Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40"
      >
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-text-muted">Discovery</span>
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />
      </motion.div>

      {/* Services Section */}
      <WhatWeBuild />

      {/* Technology Stack Section */}
      <section
        aria-labelledby="tech-stack-heading"
        className="relative z-10 mx-auto max-w-7xl border-t border-border-default px-4 py-20 w-full  px-4 md:px-8 md:py-28"
      >
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-xl space-y-6 mb-16">
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">Technology</span>
            </div>
            <h2
              id="tech-stack-heading"
              className="text-5xl md:text-6xl font-black text-text-primary uppercase tracking-tighter leading-none"
            >
              Built with<br />Modern Tech
            </h2>
            <p className="text-lg text-text-body md:text-xl leading-relaxed">
              We use battle-tested technologies that ensure performance, scalability, and maintainability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", bgColor: "#ffffff" },
              { name: "React", icon: <SiReact />, color: "#61DAFB", bgColor: "#61DAFB20" },
              { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", bgColor: "#3178C620" },
              { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", bgColor: "#33993320" },
              { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", bgColor: "#4169E120" },
              { name: "AWS", icon: <SiAmazon />, color: "#FF9900", bgColor: "#FF990020" },
              { name: "React Native", icon: <SiReact />, color: "#61DAFB", bgColor: "#61DAFB20" },
              { name: "Flutter", icon: <SiFlutter />, color: "#02569B", bgColor: "#02569B20" },
              { name: "Python", icon: <SiPython />, color: "#3776AB", bgColor: "#3776AB20" },
              { name: "Docker", icon: <SiDocker />, color: "#2496ED", bgColor: "#2496ED20" },
              { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5", bgColor: "#326CE520" },
              { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", bgColor: "#E1009820" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.05 }}
                className="group"
              >
                <div className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-border-subtle bg-bg-card px-4 py-8 text-sm font-bold text-text-primary shadow-sm hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 hover:border-accent/40">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: tech.bgColor,
                      color: tech.color
                    }}
                  >
                    {tech.icon}
                  </div>
                  <span>{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Signals Section */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        <motion.section
          aria-labelledby="trust-heading"
          className="relative border-t border-border-default py-20 md:py-28"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: DURATION, ease: EASE }}
        >
          <div className="text-center mb-16">
            <h2
              id="trust-heading"
              className="text-3xl md:text-4xl font-black text-text-primary uppercase mb-6"
            >
              {TRUST_HEADLINE}
            </h2>
            <p className="text-lg text-text-body max-w-2xl mx-auto">
              From startups to enterprises, we deliver production-grade solutions that scale globally.
            </p>
          </div>

          {/* Trust Signals Grid */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-4xl mx-auto"
            role="list"
          >
            {TRUST_SIGNALS.map(({ label, icon }, i) => (
              <motion.li
                key={label}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 * i }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  {TRUST_ICONS[icon]}
                </div>
                <p className="text-base font-semibold text-text-primary">
                  {label}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* Additional Trust Indicators */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-text-muted"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Active in 12+ countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>SOC2 & GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>24/7 Support Coverage</span>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Featured Insights Section */}
      <FeaturedInsights />

      {/* Why Meetechh Section */}
      <WhyMeetechh />

      {/* CTA Section */}
      <MeetechCTA />

      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  );
}
