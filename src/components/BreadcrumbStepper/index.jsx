import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';


export function StepTracker() {
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();

    const steps = [
        { id: 0, label: 'Step 1', route: '/upload' },
        { id: 1, label: 'Step 2', route: '/map-column' },
        { id: 2, label: 'Step 3', route: '/dashboard/adoption' },
    ]

    function handleClick(step) {
        event.preventDefault();
        navigate(step.route);
        setActiveStep(step.id);
    }

    React.useEffect(() => {
        const path = window.location.pathname;

        if(path.includes('map-column')) {
            setActiveStep(1);
        } else if(path.includes('dashboard')) {
            setActiveStep(2);
        } else {
            setActiveStep(0);
        }

    },[window.location.pathname])

    return (
        <div>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {
                    steps.map((step) => (
                        <Link 
                            key={step.id} 
                            href="/" 
                            onClick={() => handleClick(step)} 
                            underline="none" 
                            style={{ 
                                color: activeStep === step.id ? '#121926' : '#acafb3',
                                fontWeight: activeStep === step.id ? '600' : '500'
                            }}>
                            {step.label}
                        </Link>
                    ))
                }
            </Breadcrumbs>
        </div>
    );
}
