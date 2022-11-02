import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { 
    getProfessions,
    getProfessionsLoadingStatus,
    getProfessionsByIds } from "../../store/professions";

const Profession = ({ id }) => {

    const { /*isLoading,*/ getProfession } = useProfessions();
    const professions = useSelector(getProfessions())
    //console.log('professions', professions)
    const isLoading = useSelector(getProfessionsLoadingStatus())

    //const prof = getProfession(id);
    
    const prof = useSelector(getProfessionsByIds(id));

    //console.log('prof', prof)
    
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
