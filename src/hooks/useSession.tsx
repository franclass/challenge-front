import { useContext } from 'react';
import { SessionContext } from '@providers/SessionProvider';    

export default function useSession() {
    const context = useContext(SessionContext);
            
        if (!context) {
            throw new Error('useSession must be used within a SessionProvider');
        }
    return context;
}


