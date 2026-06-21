'use client'

import Button_link from '@/components/ui/button/Button_link'
import { Skill, SpecializationItem } from '@/Typeinterface/InterfaceType'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type Props = {
    data?: SpecializationItem,
    SKILLS_DATA?: Skill[],
}

const SpecializationLogo: React.FC<Props> = ({ data, SKILLS_DATA }) => {

    const allSkills = Array.isArray(SKILLS_DATA) ? SKILLS_DATA : [];

    // ===== Top 4 icons =====
    const TOP_WINDOW_SIZE = 4;
    const [topStartIndex, setTopStartIndex] = useState(0);
    const topContainerRef = useRef<HTMLDivElement>(null);
    const totalSkillsForTop = allSkills.length;

    useEffect(() => {
        if (totalSkillsForTop <= TOP_WINDOW_SIZE) return;
        const interval = setInterval(() => {
            if (!topContainerRef.current) return;
            gsap.to(topContainerRef.current, {
                opacity: 0, y: -8, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    setTopStartIndex(prev =>
                        prev + TOP_WINDOW_SIZE >= totalSkillsForTop ? 0 : prev + TOP_WINDOW_SIZE
                    );
                }
            });
        }, 2500);
        return () => clearInterval(interval);
    }, [totalSkillsForTop]);

    useEffect(() => {
        if (!topContainerRef.current) return;
        gsap.fromTo(topContainerRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
    }, [topStartIndex]);

    const topIcons = totalSkillsForTop > 0
        ? allSkills.slice(topStartIndex, topStartIndex + TOP_WINDOW_SIZE)
        : [];

    // ===== Column scroll =====
    const COL_COUNT = 5;
    const colTrackRefs = useRef<(HTMLDivElement | null)[]>([]);
    const colTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
    const overlayRef = useRef<HTMLDivElement>(null);
    const aboutBtnRef = useRef<HTMLAnchorElement>(null);
    const darkOverlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeSkill, setActiveSkill] = useState<{
        name: string; category: string; src?: string
    } | null>(null);
    const activeColRef = useRef<number | null>(null);

    const skillColumns: Skill[][] = Array.from({ length: COL_COUNT }, (_, colIndex) =>
        allSkills.filter((_, i) => i % COL_COUNT === colIndex)
    );

    const filledColumns = skillColumns.map(col => {
        if (col.length === 0) return col;
        const filled = [...col];
        while (filled.length < 8) filled.push(...col);
        return filled.slice(0, Math.max(filled.length, 8));
    });

    useEffect(() => {
        if (allSkills.length === 0) return;
        const setupTweens = () => {
            colTweenRefs.current.forEach(t => t?.kill());
            colTweenRefs.current = colTrackRefs.current.map((track, colIndex) => {
                if (!track) return null;
                if (filledColumns[colIndex]?.length === 0) return null;
                const goDown = colIndex % 2 === 0;
                gsap.set(track, { yPercent: goDown ? 0 : -50 });
                return gsap.to(track, {
                    yPercent: goDown ? -50 : 0,
                    duration: Math.max(filledColumns[colIndex].length * 1.5, 8),
                    ease: 'none',
                    repeat: -1,
                }).pause();
            });
        };
        const timer = setTimeout(setupTweens, 50);
        window.addEventListener('resize', setupTweens);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', setupTweens);
            colTweenRefs.current.forEach(t => t?.kill());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSkills.length]);

    const handleCardEnter = () => {
        colTweenRefs.current.forEach(t => t?.play());
        if (aboutBtnRef.current) {
            gsap.fromTo(aboutBtnRef.current,
                { opacity: 0, y: 16, scale: 0.92 },
                { opacity: 1, y: 0, scale: 1, duration: 0.45, delay: 0.05, ease: 'back.out(1.7)' }
            );
        }
    };

    const handleCardLeave = () => {
        colTweenRefs.current.forEach(t => t?.play());
        hideModal();
    };

    // Item click handler
    const handleItemClick = (skill: Skill, colIndex: number) => {
        if (activeColRef.current !== null && activeColRef.current !== colIndex) {
            colTweenRefs.current[activeColRef.current]?.play();
        }
        if (
            activeSkill?.name === skill.name &&
            activeColRef.current === colIndex
        ) {
            hideModal();
            return;
        }

        // নতুন column pause
        colTweenRefs.current[colIndex]?.pause();
        activeColRef.current = colIndex;

        // dark overlay show
        if (darkOverlayRef.current) {
            gsap.to(darkOverlayRef.current, { opacity: 1, duration: 0.2 });
        }

        setActiveSkill({
            name: skill.name || '',
            category: (skill as Skill & { category?: string }).category || '',
            src: skill.iconPath?.src,
        });
    };

    const hideModal = () => {
        // active column resume
        if (activeColRef.current !== null) {
            colTweenRefs.current[activeColRef.current]?.play();
            activeColRef.current = null;
        }

        if (darkOverlayRef.current) {
            gsap.to(darkOverlayRef.current, { opacity: 0, duration: 0.18 });
        }

        if (modalRef.current) {
            gsap.to(modalRef.current, {
                opacity: 0, y: 6, duration: 0.15, ease: 'power2.in',
                onComplete: () => setActiveSkill(null)
            });
        } else {
            setActiveSkill(null);
        }
    };

    // Modal animate in
    useEffect(() => {
        if (activeSkill && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
            );
        }
    }, [activeSkill]);

    return (
        <div
            className='w-full mt-5 relative group rounded-2xl'
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
        >

            {activeSkill && (
                <div
                    ref={modalRef}
                    className='absolute top-1 right-1 z-50 pointer-events-none'
                >
                    <div className='bg-white dark:bg-white/15 backdrop-blur-xl border border-white/25 rounded-xl p-3 shadow-2xl min-w-[140px] max-w-[170px]'>
                        {activeSkill.src && (
                            <div className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-2 mx-auto'>
                                <Image
                                    src={activeSkill.src}
                                    alt={activeSkill.name}
                                    width={32}
                                    height={32}
                                    className='w-full  h-full object-contain'
                                />
                            </div>
                        )}
                        <p className='text-gray-800 dark:text-gray-50 text-[11px] font-semibold text-center leading-tight'>
                            {activeSkill.name}
                        </p>
                        {activeSkill.category && (
                            <p className='text-gray-700 dark:text-gray-200 text-[9px] text-center mt-1 uppercase tracking-wider'>
                                {activeSkill.category}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className='w-full h-full grid grid-cols-12 gap-2 md:gap-5 bg-transparent px-3 md:px-5 py-6 md:py-6 rounded-2xl ring-[0.5px] ring-Light_primary/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden shadow-xl/4'>

                {/* Top 4 icons */}
                <div ref={topContainerRef} className='col-span-12 grid grid-cols-4 gap-2 md:gap-3'>
                    {topIcons.map((item, index) => (
                        <div key={index} className='flex justify-center'>
                            <div className="w-full aspect-square max-w-[72px] md:max-w-[88px] shadow-sm md:shadow-lg dark:bg-white/15 dark:ring-1 dark:ring-primary/50 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-95 overflow-hidden">
                                {item?.iconPath?.src ? (
                                    <Image
                                        src={item.iconPath.src}
                                        alt={item.name || 'skill icon'}
                                        width={56}
                                        height={56}
                                        className='w-10 h-10 md:w-12 md:h-12 object-contain'
                                    />
                                ) : (
                                    <span className='text-sm text-gray-500 font-bold'>{item?.name?.charAt(0)}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className='grid grid-cols-12 col-span-12 relative z-10 mt-2'>
                    <div className='col-span-6'>
                        <span className='text-xs md:text-sm text-gray-500'>{data?.slug}</span>
                        <h3 className='text-lg md:text-xl text-secondary font-Yanone-Semibold uppercase tracking-[0.1rem] md:tracking-[0.2rem]'>{data?.title}</h3>
                    </div>
                    <div className='col-span-6 flex flex-col items-end justify-center'>
                        <span className='text-xs md:text-sm text-gray-500'>years of</span>
                        <h3 className='text-lg md:text-xl text-secondary font-Yanone-Semibold uppercase tracking-[0.1rem] md:tracking-[0.2rem]'>Experience</h3>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div
                    ref={overlayRef}
                    className='hidden md:flex absolute inset-0 bg-gray-200 dark:bg-Dark_primary backdrop-blur-md border border-white/10 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-20 rounded-2xl overflow-hidden pointer-events-none group-hover:pointer-events-auto'
                >
                    {/* Dark dimmer */}
                    <div
                        ref={darkOverlayRef}
                        className='absolute inset-0 bg-black/55 z-10 pointer-events-none rounded-2xl'
                        style={{ opacity: 0 }}
                    />

                    {/* 4 column vertical scroll */}
                    <div className='relative flex-1 flex flex-row gap-2 px-3 py-3 overflow-hidden min-h-0'>
                        <div className='absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-primary/0 to-transparent z-[5] pointer-events-none' />
                        <div className='absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t  dark:from-Dark_primary to-transparent z-[5] pointer-events-none' />

                        {filledColumns.map((col, colIndex) => (
                            col.length === 0 ? null : (
                                <div key={colIndex} className='relative flex-1 overflow-hidden'>
                                    <div
                                        ref={(el) => { colTrackRefs.current[colIndex] = el }}
                                        className='flex flex-col gap-2 will-change-transform'
                                    >
                                        {[...col, ...col].map((skill, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleItemClick(skill, colIndex)}
                                                className={`relative flex-shrink-0 w-full p-2 aspect-square ring-1 rounded-lg flex items-center justify-center transition-all duration-200 overflow-hidden cursor-pointer z-20
                                                    ${activeSkill?.name === skill.name
                                                        ? 'bg-white dark:bg-white/10 shadow-md ring-white/70 scale-95'
                                                        : 'bg-white dark:bg-white/10 shadow-md hover:bg-white/80 dark:hover:bg-white/13 dark:ring-0 ring-white/15 hover:ring-white/40'
                                                    }`}
                                            >
                                                {skill?.iconPath?.src ? (
                                                    <Image
                                                        src={skill.iconPath.src}
                                                        alt={skill.name || 'skill icon'}
                                                        width={32}
                                                        height={32}
                                                        className='w-full h-full object-contain'
                                                    />
                                                ) : (
                                                    <span className='text-[9px] text-white/70 font-bold'>{skill.name?.charAt(0)}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* About Me button */}
                    <div className='relative flex-shrink-0 flex justify-center pb-4 pt-1 z-20'>

                        <Button_link
                            ref={aboutBtnRef}
                            href="/about"
                            text='About Me'
                            className='ring-1 ring-primary uppercase px-2 py-1'
                        />
                    </div>
                </div>
            </div>

            {/* Mobile button */}
            <div className='md:hidden -mt-3 flex justify-center'>
                <Button_link
                    href="/about"
                    text='About Me'
                    className='ring-1 ring-primary uppercase px-2 py-1'
                />
            </div>
        </div>
    )
}

export default SpecializationLogo