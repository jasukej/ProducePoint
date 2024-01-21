

const ProtectedRoute = ({ children }) => {
    const { user } = useUserAuth();
  
    console.log("Check user in Private: ", user);
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

export default ProtectedRoute;