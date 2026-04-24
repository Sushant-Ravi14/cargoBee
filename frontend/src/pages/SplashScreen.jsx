import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import beeLogo from '../assets/bee-logo.png';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <PageWrapper className="bg-primary flex flex-col justify-center items-center relative overflow-hidden">
            {/* Subtle dot grid watermark */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #D4860A 2px, transparent 2px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="z-10 flex flex-col items-center">
                {/* Bee Logo — real image */}
                <div className="animate-float mb-6 drop-shadow-2xl">
                    <img
                        src={beeLogo}
                        alt="CargoBee logo"
                        className="w-36 h-36 object-contain"
                        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))' }}
                    />
                </div>

                <h1 className="text-4xl font-black text-accent tracking-tight mb-2">CargoBee</h1>
                <p className="text-accent/80 font-medium tracking-wide">Your City. Your Cargo. On Demand.</p>
            </div>

            <div className="absolute bottom-12 w-full px-12 flex flex-col items-center z-10">
                <p className="text-xs font-bold text-accent/60 tracking-widest mb-4">POWERED BY INDIA'S FASTEST GROWING CARGO NETWORK</p>
                <div className="h-1.5 w-64 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full splash-progress" />
                </div>
            </div>
        </PageWrapper>
    );
};

export default SplashScreen;
