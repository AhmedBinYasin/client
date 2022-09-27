import { useState } from 'react';

function useProps() {
    const getUserProps = () => {
        const propsString = localStorage.getItem('userProps');
        const userProps = JSON.parse(propsString);
        return userProps
      };

    const [Props,setUserProps]=useState(getUserProps());

    const saveUserProps = (userProps) => {
        if(userProps!=undefined){localStorage.setItem('userProps', JSON.stringify(userProps));}
        setUserProps(userProps);
      };

      return {
        setUserProps: saveUserProps,
        userProps:Props
      }
}

export default useProps