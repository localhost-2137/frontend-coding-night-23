import {AnimatePresence, motion} from "framer-motion";
import {TbX} from "react-icons/tb";
import {useAtom} from "jotai";
import {helpModalAtom} from "../../../Atoms.ts";
import {useState} from "react";
import Button from "../../../Components/Button.tsx";
import screen1 from "../assets/screen1.png"
import screen2 from "../assets/screen2.png"

export default function HelpModal() {

    const [, setShowHelpModal] = useAtom(helpModalAtom)
    const [actualPage, setActualPage] = useState<number>(0)

    const pages = [
        <div className="text-white text-center flex flex-col gap-8">
            <h1 className="text-4xl">Welcome to Home Scheme!</h1>
            <p className="text-xl">This is a quick guide to help you get started.</p>
        </div>,
        <div className="text-white flex flex-col gap-8 max-h-fit overflow-auto px-2">
            <h1 className="text-xl">1. First, you must select room from left area. (If you do not have any, then go to
                rooms page).</h1>
            <img className="max-w-full h-auto" src={screen1} alt=""/>
            <p className="text-xl">After selecting room, click on the grid square. Now you added your first room to
                scheme</p>
            <img className="max-w-full h-auto" src={screen2} alt=""/>
        </div>,
    ]

    return (
        <div className="fixed z-20 w-screen h-screen left-0 top-0 bg-[#00000040] flex items-center justify-center">
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0.5, bottom: -50}}
                    animate={{opacity: 1, bottom: 0}}
                    transition={{duration: 0.2}}
                    className="2xl:w-1/3 xl:w-1/2 w-full xl:h-4/5 h-full xl:border-4 border-bgLght xl:rounded-xl bg-bgClr py-28 px-8 relative flex flex-col gap-4 items-center xl:justify-between justify-center"
                >
                    {pages[actualPage]}
                    <TbX
                        className="text-2xl text-white absolute right-6 top-6 cursor-pointer"
                        onClick={() => {
                            setShowHelpModal(false);
                        }}
                    />
                    <div className="flex justify-between items-center w-full gap-8 mt-auto">
                        <Button disabled={actualPage == 0} width={"w-[50%]"} onClick={() => {
                            setActualPage(prevState => prevState - 1)
                        }} type={"default"}>Previous</Button>
                        <Button disabled={actualPage === pages.length - 1} width={"w-[50%]"} onClick={() => {
                            setActualPage(prevState => prevState + 1)
                        }}
                                type={"default"}>Next</Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}