import React from 'react';

const NCCBoatChart = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-transparent w-full overflow-hidden">
            <div className="relative w-full max-w-4xl h-[500px] flex flex-col items-center">

                {/* Sail Layout */}
                <div className="flex justify-center items-end gap-4 mb-2 w-full h-[350px]">

                    {/* Sail 1: Purpose */}
                    <div className="relative group w-1/4 h-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-400 rounded-tr-[100px] rounded-bl-sm shadow-lg transition-transform duration-300 group-hover:-translate-y-2 flex flex-col p-4 text-white">
                            <h3 className="text-lg font-bold border-b border-white/30 pb-1 mb-3">Purpose</h3>
                            <ul className="text-xs space-y-2 opacity-90">
                                <li>• Develop discipline and leadership</li>
                                <li>• Encourage patriotism</li>
                                <li>• Build confidence</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sail 2: Activities */}
                    <div className="relative group w-1/4 h-[90%]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-tr-[80px] rounded-bl-sm shadow-lg transition-transform duration-300 group-hover:-translate-y-2 flex flex-col p-4 text-white">
                            <h3 className="text-lg font-bold border-b border-white/30 pb-1 mb-3">Activities</h3>
                            <ul className="text-xs space-y-2 opacity-90">
                                <li>• Parade and drill training</li>
                                <li>• Personality development</li>
                                <li>• Community service</li>
                                <li>• National competitions</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sail 3: Achievements */}
                    <div className="relative group w-1/4 h-[95%]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-tr-[90px] rounded-bl-sm shadow-lg transition-transform duration-300 group-hover:-translate-y-2 flex flex-col p-4 text-white">
                            <h3 className="text-lg font-bold border-b border-white/30 pb-1 mb-3 text-slate-800">Achievements</h3>
                            <div className="text-xs space-y-2 text-slate-800 font-medium">
                                <p className="font-bold underline">Lavanya N.</p>
                                <p>Represented TN, Puducherry, AN Directorate</p>
                                <p className="bg-white/40 p-1 rounded italic">Gold Medal: All India Thal Sainik Camp 2023</p>
                            </div>
                        </div>
                    </div>

                    {/* Sail 4: Benefits */}
                    <div className="relative group w-1/4 h-[85%]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-tr-[70px] rounded-bl-sm shadow-lg transition-transform duration-300 group-hover:-translate-y-2 flex flex-col p-4 text-white">
                            <h3 className="text-lg font-bold border-b border-white/30 pb-1 mb-3">Benefits</h3>
                            <ul className="text-xs space-y-2 opacity-90">
                                <li>• Teamwork & Discipline</li>
                                <li>• National exposure</li>
                                <li>• Physical fitness</li>
                                <li>• Leadership skills</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Boat Hull (Base) */}
                <div className="relative w-full h-[120px]">
                    <div
                        className="w-full h-full bg-slate-800 shadow-2xl relative flex items-center justify-center overflow-hidden"
                        style={{
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                        }}
                    >
                        {/* Highlights/Waves on hull */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/10"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-px bg-white/5"></div>

                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase">
                            NCC – National Cadet Corps
                        </h2>
                    </div>

                    {/* Water Shadow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[95%] h-6 bg-blue-900/20 blur-xl rounded-full"></div>
                </div>

            </div>
        </div>
    );
};

export default NCCBoatChart;
