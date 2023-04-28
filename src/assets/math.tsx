export const Hello = () => {
    let helloWorld: string = "Hello World";
    let value: number = 64;
    let bool: boolean | string = "true";

    return (
        <div className="flex">
            <p className="flex-auto text-center">
                {helloWorld}
                <br></br>
                {value}
                <br></br>
                {bool}
                <br></br>
                {helloWorld + " " + bool}
            </p>
        </div>
    );
}