import React from 'react';

const DownloadProject: React.FC = () => {
  const handleDownload = () => {
    // プロジェクトのダウンロード機能（将来的に実装）
    console.log('Download project functionality would be implemented here');
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-secondary text-primary-dark font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
    >
      Download Project
    </button>
  );
};

export default DownloadProject; 