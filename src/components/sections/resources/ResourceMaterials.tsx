import React, { useState } from "react";
import { Play, Code, FileText, Download, ExternalLink, BookOpen } from "lucide-react";

interface Resource {
    id: string;
    title: string;
    description: string;
    type: "video" | "code" | "pdf";
    url?: string;
    thumbnail?: string;
    author?: string;
    duration?: string;
    downloadSize?: string;
}

const ResourceMaterials: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"all" | "video" | "code" | "pdf">("all");

    const resources: Resource[] = [
        {
            id: "1",
            title: "Getting Started with DesiCodes",
            description: "Learn the basics of multilingual programming with DesiCodes. This comprehensive tutorial covers IDE setup, basic syntax, and your first transpilation.",
            type: "video",
            url: "/resource_video.mp4",
            author: "DesiCodes Team",
            duration: "15:30",
        },
        {
            id: "2",
            title: "Hindi to Python - Complete Guide",
            description: "Master Hindi programming syntax and transpile to Python. Includes loops, conditionals, functions, and object-oriented concepts.",
            type: "video",
            url: "https://www.youtube.com/watch?v=UrsmFxEIp5k",
            author: "DesiCodes Team",
            duration: "22:45",
        },
        {
            id: "3",
            title: "Assamese Programming Examples",
            description: "Collection of asPy code examples demonstrating core programming concepts in Assamese language with Python transpilation.",
            type: "code",
            url: "https://github.com/CJTechnology21/desicodefrontend",
            author: "Community Contributors",
        },
        {
            id: "4",
            title: "Multilingual Syntax Reference",
            description: "Complete syntax guide for all supported languages. Quick reference for keywords, operators, and common patterns.",
            type: "pdf",
            url: "https://aclanthology.org/2022.spnlp-1.1.pdf",
            downloadSize: "2.3 MB",
            author: "DesiCodes Documentation Team",
        },
        {
            id: "5",
            title: "Bengali Code Repository",
            description: "Open-source repository with Bengali programming examples, from beginner to advanced level. Fork and contribute!",
            type: "code",
            url: "https://github.com/CJTechnology21/desicodefrontend",
            author: "Community Contributors",
        },
        {
            id: "6",
            title: "Data Structures in Regional Languages",
            description: "Learn data structures and algorithms using your native language. Covers arrays, linked lists, trees, and graph algorithms.",
            type: "pdf",
            url: "https://donsheehy.github.io/datastructures/fullbook.pdf",
            downloadSize: "5.8 MB",
            author: "Dr. Rajesh Kumar",
        },
        {
            id: "7",
            title: "Advanced Transpilation Techniques",
            description: "Deep dive into how DesiCodes transpiler works. Understand AST parsing, optimization, and custom language support.",
            type: "video",
            url: "https://www.youtube.com/watch?v=ed3pa3lg6j4",
            author: "DesiCodes Team",
            duration: "32:15",
        },
        {
            id: "8",
            title: "Community Code Samples",
            description: "Curated collection of real-world projects built with DesiCodes. Learn from community-contributed code in multiple languages.",
            type: "code",
            url: "https://github.com/CJTechnology21/desicodebackend",
            author: "Community Contributors",
        },
    ];

    const filteredResources = activeTab === "all"
        ? resources
        : resources.filter(r => r.type === activeTab);

    const getIcon = (type: string) => {
        switch (type) {
            case "video":
                return <Play className="w-5 h-5" />;
            case "code":
                return <Code className="w-5 h-5" />;
            case "pdf":
                return <FileText className="w-5 h-5" />;
            default:
                return <BookOpen className="w-5 h-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "video":
                return "from-red-500 to-pink-500";
            case "code":
                return "from-blue-500 to-purple-500";
            case "pdf":
                return "from-green-500 to-teal-500";
            default:
                return "from-gray-500 to-gray-600";
        }
    };

    // Helper function to extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Helper function to check if URL is a YouTube video
    const isYouTubeVideo = (url: string): boolean => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    // Helper function to get YouTube thumbnail URL
    const getYouTubeThumbnail = (url: string): string | null => {
        const videoId = getYouTubeVideoId(url);
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    };

    return (
        <section className="bg-[#05010d] py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Learning Resources
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Explore our collection of video tutorials, code repositories, and study materials
                        to accelerate your multilingual programming journey
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {[
                        { key: "all", label: "All Resources", icon: <BookOpen className="w-4 h-4" /> },
                        { key: "video", label: "Videos", icon: <Play className="w-4 h-4" /> },
                        { key: "code", label: "Code", icon: <Code className="w-4 h-4" /> },
                        { key: "pdf", label: "PDFs", icon: <FileText className="w-4 h-4" /> },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.key
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <div
                            key={resource.id}
                            className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-1 overflow-hidden hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:scale-105"
                        >
                            <div className="relative bg-[#0D0A14] rounded-lg p-6 h-full flex flex-col">
                                {/* Type Badge */}
                                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r ${getTypeColor(resource.type)} flex items-center justify-center text-white shadow-lg`}>
                                    {getIcon(resource.type)}
                                </div>

                                {/* Video Thumbnail for video type */}
                                {resource.type === "video" && resource.url && (
                                    <>
                                        {isYouTubeVideo(resource.url) ? (
                                            // YouTube Thumbnail
                                            <div
                                                className="relative mb-4 rounded-lg overflow-hidden bg-black/50 aspect-video flex items-center justify-center group-hover:ring-2 ring-blue-500 transition-all cursor-pointer"
                                                onClick={() => window.open(resource.url, "_blank")}
                                            >
                                                <img
                                                    src={getYouTubeThumbnail(resource.url) || ""}
                                                    alt={resource.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback to hqdefault if maxresdefault doesn't exist
                                                        const videoId = getYouTubeVideoId(resource.url!);
                                                        if (videoId) {
                                                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                        }
                                                    }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Play className="w-8 h-8 text-white ml-1" />
                                                    </div>
                                                </div>
                                                {/* YouTube Badge */}
                                                <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                                                    <Play className="w-3 h-3" fill="white" />
                                                    YouTube
                                                </div>
                                            </div>
                                        ) : (
                                            // Local Video Preview
                                            <div
                                                className="relative mb-4 rounded-lg overflow-hidden bg-black/50 aspect-video flex items-center justify-center group-hover:ring-2 ring-blue-500 transition-all cursor-pointer"
                                                onClick={() => window.open(resource.url, "_blank")}
                                            >
                                                <video
                                                    src={resource.url}
                                                    className="w-full h-full object-cover opacity-70"
                                                    muted
                                                    loop
                                                    onMouseEnter={(e) => e.currentTarget.play()}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.pause();
                                                        e.currentTarget.currentTime = 0;
                                                    }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Play className="w-8 h-8 text-white ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2 pr-12">
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-white/60 mb-4 leading-relaxed">
                                        {resource.description}
                                    </p>
                                </div>

                                {/* Meta Information */}
                                <div className="space-y-2 mb-4">
                                    {resource.author && (
                                        <p className="text-xs text-white/50">By {resource.author}</p>
                                    )}
                                    <div className="flex items-center gap-3 text-xs text-white/40">
                                        {resource.duration && (
                                            <span className="flex items-center gap-1">
                                                <Play className="w-3 h-3" />
                                                {resource.duration}
                                            </span>
                                        )}
                                        {resource.downloadSize && (
                                            <span className="flex items-center gap-1">
                                                <Download className="w-3 h-3" />
                                                {resource.downloadSize}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    className={`w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r ${getTypeColor(resource.type)} hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105`}
                                    onClick={() => {
                                        if (resource.url) {
                                            if (resource.type === "video") {
                                                // Open video in new tab or handle inline
                                                window.open(resource.url, "_blank");
                                            } else {
                                                window.open(resource.url, "_blank");
                                            }
                                        }
                                    }}
                                >
                                    {resource.type === "video" && "Watch Now"}
                                    {resource.type === "code" && (
                                        <>
                                            View Repository <ExternalLink className="w-4 h-4" />
                                        </>
                                    )}
                                    {resource.type === "pdf" && (
                                        <>
                                            Download PDF <Download className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredResources.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-10 h-10 text-white/30" />
                        </div>
                        <p className="text-white/40 text-lg">No resources found in this category</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResourceMaterials;
