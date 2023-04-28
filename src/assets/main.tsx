//logo import
import linkedin from "../images/social/linkedin_icon2.png";
import github from "../images/social/github.png";
import email from "../images/social/email_icon.png";

export const Navigation = () => {
    return(
        //Sample Navigation Headers
        <nav className="flex py-2 text-lg font-bold bg-[#A33FD6]">
            <a href="" className="flex-auto pl-4 no-underline hover:text-xl">Home</a>
            <a href="" className="flex-auto no-underline hover:text-xl">Data View</a>
            <a href="" className="flex-auto no-underline hover:text-xl">Data Room</a>
            <a href="" className="flex-auto no-underline hover:text-xl">Data Download</a>
            <a href="" className="flex-auto no-underline hover:text-xl">Login/Signup</a>
        </nav>
    );
}

export const Footer = () => {

    return(
        //Sample Footer Headers
        <footer className="flex items-center w-full absolute bottom-0 py-2 text-lg bg-[#A33FD6]">

            <h1 className="flex-auto pl-4">
                Minsight Solutions Inc.
            </h1>

            <p className="flex-auto">
                <em> A geologic database for modern mineral exploration </em> 
            </p>

            <div className="pr-4">
                <div className="flex">
                    <a href="https://www.linkedin.com/in/celw10/" className="flex-auto mr-1"> 
                        <img src={linkedin} alt="linkedin"></img> 
                    </a>

                    <a href="https://github.com/celw10" className="flex-auto mx-1"> 
                        <img src={github} alt="github"></img>
                    </a>

                    <a href="mailto:celw10@mun.ca" className="flex-auto ml-1"> 
                        <img src={email} alt="email"></img>
                    </a>  
                </div>
            </div>

        </footer>       
    )
}