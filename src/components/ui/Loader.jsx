import React from 'react';

const Loader = ({ size = '15px', className = '' }) => {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div 
                className="loader" 
                style={{
                    '--s': size,
                    width: `calc(var(--s) * 2.33)`,
                    aspectRatio: '1',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <style jsx>{`
                    .loader::before,
                    .loader::after {
                        content: "";
                        width: var(--s);
                        --_g: no-repeat radial-gradient(farthest-side, #CCC0B2 94%, transparent);
                        background: var(--_g) top, var(--_g) bottom;
                        background-size: 100% var(--s);
                        transform-origin: 50% calc(100% - var(--s) / 2);
                        animation: l30 1s infinite;
                    }
                    .loader::after {
                        transform-origin: 50% calc(var(--s) / 2);
                    }
                    @keyframes l30 {
                        70%,
                        100% {
                            transform: rotate(-270deg);
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Loader;
