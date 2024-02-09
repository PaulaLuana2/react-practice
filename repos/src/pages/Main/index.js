import React from "react";
import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Form, SubmitButton } from "./styles";

export default function Main(){
    return(
        <Container>
            <FaGithub size={25}/>
            <h1>Meus repositorios</h1>

            <Form onSubmit={() =>{}}>
                <input type="text" placeholder="Adicionar repositórios"/>

                <SubmitButton>
                    <FaPlus color="#fff" size={14}/>
                </SubmitButton>
            </Form>
        </Container>    
    )
}