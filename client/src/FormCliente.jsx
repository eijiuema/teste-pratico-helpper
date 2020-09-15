import React from 'react';
import { useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { Paper, Box, Typography, Grid, TextField, Button, CircularProgress } from '@material-ui/core';

function TelefoneMask(props) {
    const { inputRef, ...other } = props;

    function mask(userInput) {
        let numbers = userInput.match(/\d/g);
        let numberLength = 0;
        if (numbers) {
            numberLength = numbers.join("").length;
        }

        if (numberLength > 10) {
            return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        } else {
            return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        }
    }

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={mask}
            placeholderChar={'\u2000'}
        />
    )
}

function CpfCnpjMask(props) {
    const { inputRef, ...other } = props;

    function mask(userInput) {
        let numbers = userInput.match(/\d/g);
        let numberLength = 0;
        if (numbers) {
            numberLength = numbers.join("").length;
        }

        if (numberLength > 11) {
            return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
        } else {
            return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
        }
    }

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={mask}
            placeholderChar={'\u2000'}
        />
    )
}

function CepMask(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    )
}

export default function FormCliente({ afterSubmit }) {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = (data, e) => {
        if (!loading) {
            setLoading(true);
            window.fetch('http://localhost:3001/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(response => {
                afterSubmit(response);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Cadastrar cliente</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='nome' inputRef={register} label='Nome' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type='email' required name='email' inputRef={register} label='E-mail' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='cpf_cnpj' inputRef={register} label='CPF/CNPJ' variant='filled' fullWidth InputProps={{ inputComponent: CpfCnpjMask }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='telefone' inputRef={register} label='Telefone' variant='filled' fullWidth InputProps={{ inputComponent: TelefoneMask }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='cep' inputRef={register} label='CEP' variant='filled' fullWidth InputProps={{ inputComponent: CepMask }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='logradouro' inputRef={register} label='Logradouro' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='numero' inputRef={register} label='Número' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='bairro' inputRef={register} label='Bairro' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='cidade' inputRef={register} label='Cidade' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required name='estado' inputRef={register} label='Estado' variant='filled' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={loading} type='submit' color='primary' variant='contained'>{loading ? <CircularProgress size={24} /> : 'Cadastrar'}</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </form>
    )
};