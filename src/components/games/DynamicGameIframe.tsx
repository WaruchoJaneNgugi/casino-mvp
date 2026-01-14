// import React from 'react';
// import { gameUrls, gameTitles } from '@/utils/gameComponents';
//
// interface DynamicGameIframeProps {
//     gameId: string;
//     config?: any;
// }
//
// export const DynamicGameIframe: React.FC<DynamicGameIframeProps> = ({ gameId, config }) => {
//     const gameUrl = gameUrls[gameId];
//     const title = gameTitles[gameId];
//
//     if (!gameUrl) {
//         return (
//             <div className="text-white p-8 text-center">
//                 <div className="bg-stake-dark rounded-2xl p-8 max-w-md mx-auto">
//                     <div className="text-6xl mb-4">❌</div>
//                     <h3 className="text-xl font-bold mb-2">Game Not Found</h3>
//                     <p className="text-gray-400">Game ID: {gameId}</p>
//                 </div>
//             </div>
//         );
//     }
//
//     // Add config as URL parameters if needed
//     const urlWithConfig = config ? `${gameUrl}?config=${encodeURIComponent(JSON.stringify(config))}` : gameUrl;
//
//     return (
//         <div className="w-full h-screen">
//             <iframe
//                 src={urlWithConfig}
//                 title={title}
//                 className="w-full h-full border-0"
//                 sandbox="allow-scripts allow-same-origin allow-forms"
//                 allowFullScreen
//             />
//         </div>
//     );
// };