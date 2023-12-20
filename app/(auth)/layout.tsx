const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    );
}

export default AuthLayout;

//maybe need to use "server only" wherever db is used? ok actually still not sure
//downgrade nextjs