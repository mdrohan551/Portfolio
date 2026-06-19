import React from 'react';
import type { Testimonial } from '../Typeinterface/InterfaceType';

const StarRating = ({ count }: { count: number }) => {
    return (
        <div className="flex gap-1 mb-3">
            {[...Array(count)].map((_, i) => (
                <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const TestimonialCard: React.FC<{ data: Testimonial }> = ({ data }) => {
    return (
        <div className="relative p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary transition-all group shadow-sm hover:shadow-xl duration-300">
            {/* Quote Icon Background */}
            <div className="absolute top-6 right-8 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900 dark:text-white">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M14.017 21H10.017V11C10.017 9.34315 11.3601 8 13.017 8H14.017M6.01761 21L6.01761 18C6.01761 16.8954 6.91304 16 8.01761 16H11.0176C11.5699 16 12.0176 15.5523 12.0176 15V9C12.0176 8.44772 11.5699 8 11.0176 8H7.01761C6.46533 8 6.01761 8.44772 6.01761 9V11M6.01761 21H2.01761V11C2.01761 9.34315 3.36076 8 5.01761 8H6.01761" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <StarRating count={data.rating} />

            <p className="text-slate-600 dark:text-gray-300 mb-8 leading-relaxed italic relative z-10">
                "{data.feedback}"
            </p>

            <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <img
                    src={data.avatar}
                    alt={data.name}
                    className="w-12 h-12 rounded-full border-2 border-primary/20 dark:border-blue-500/30 object-cover"
                />
                <div>
                    <h4 className="text-slate-900 dark:text-white font-bold tracking-wide">{data.name}</h4>
                    <p className="text-primary  text-sm font-medium">{data.role}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;