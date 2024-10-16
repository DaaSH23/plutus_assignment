import React from "react";
import finalpic from "@/assests/finalpicc.png";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const AboutComponent = () => {
    return (
        <div className="flex-1 pl-10 h-fit font-Manrope">
            <div className="rounded-xl bg-cardground p-10">
                <div className="flex justify-between">
                    <div className=" flex-1">
                        <div>Developed By</div>
                        <div className="flex items-baseline">
                            <h1 className="text-3xl font-extrabold">Abhishek Oraon</h1>
                            <p className="p-3">{`(Software Developer)`}</p>
                        </div>

                        <div className="pr-10 text-xs">
                            <p>He is a software developer skilled in JavaScript, Python, C++, and
                                frameworks like Node.js, React, Express, .NET and Next.js etc. He has experience working with databases
                                such as MongoDB, PostgreSQL, and MySQL. Abhishek has interned at Digital Resonance Pvt Ltd,
                                leading projects in student management and asset tracking systems. He has built an automated
                                CV builder using OpenAI, Docker, and AWS, and developed several NPM packages like cli-task-tracker
                                and react-load-ui. Abhishek holds a degree in Information Technology from
                                Government College of Engineering and Ceramic Technology, Kolkata.
                            </p>
                        </div>

                        <div className="text-textColor1 mt-6 text-sm space-y-3">
                            <div className="">
                                {/* <span className="font-bold">Email - </span> */}
                                <a href="mailto:reachtoabhisheko@gmail.com" className="flex items-center">
                                    <FaEnvelope className="mr-2" /> reachtoabhisheko@gmail.com
                                </a>
                            </div>
                            <div className="">
                                {/* <span className="font-bold">Github - </span> */}
                                <a href="https://github.com/DaaSH23" className="flex items-center">
                                    <FaGithub className="mr-2" /> github.com/DaaSH23
                                </a>
                            </div>
                            <div className="">
                                {/* <span className="font-bold">LinkedIn - </span> */}
                                <a href="https://www.linkedin.com/in/abhishek-oraon-developer/" className="flex items-center">
                                    <FaLinkedin className="mr-2" /> linkedin.com/in/abhishek-oraon-developer
                                </a>
                            </div>
                            <div className="">
                                {/* <span className="font-bold">Website - </span> */}
                                <a href="https://daash23.github.io/abhishekO-portfolio/" className="flex items-center">
                                    <FaGlobe className="mr-2" /> github.io/abhishek-oraon
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="text-center">
                            <Image
                                width={250}
                                height={250}
                                alt="Picture of the author"
                                src={finalpic}
                                className="rounded-full"
                            />
                            <h1 className="font-Manrope font-bold text-textColor1 text-lg p-4">Abhishek Oraon</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutComponent;