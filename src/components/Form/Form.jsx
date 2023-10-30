import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [title, setTitle] = useState(''); 
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [format, setFormat] = useState(''); 
    const [schedule, setSchedule] = useState('');
    const [salary, setSalary] = useState('');
    const [requirements, setReqirements] = useState('');
    const [contacts, setContacts] = useState('');
    const [subject, setSubject] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            title, city, description, format, schedule, salary, requirements, contacts,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [title, city, description, format, schedule, salary, requirements, contacts, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!title || !city || !description || !format || !schedule || !salary || !requirements || !contacts) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [title, city, description, format, schedule, salary, requirements, contacts])

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeFormat = (e) => {
        setFormat(e.target.value)
    }
    const onChangeSchedule = (e) => {
        setSchedule(e.target.value)
    }
    const onChangeSalary = (e) => {
        setSalary(e.target.value)
    }
    const onChangeReqirements = (e) => {
        setReqirements(e.target.value)
    }
    const onChangeContacts = (e) => {
        setContacts(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Вакансия'}
                value={title}
                onChange={onChangeTitle} 
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Город-адрес'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Компания'}
                value={description}
                onChange={onChangeDescription}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Формат работы (пример Онлайн, Оффлайн)'}
                value={format}
                onChange={onChangeFormat}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'График работы (5/2, 6/1, 2/2)'}
                value={schedule}
                onChange={onChangeSchedule}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Заработная плата'}
                value={salary}
                onChange={onChangeSalary}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Требования (Пример: 1. Опыт работы от 1 года, усидчивость'}
                value={requirements}
                onChange={onChangeReqirements}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Контакты (Пример: 777-333-11-22)'}
                value={contacts}
                onChange={onChangeContacts}
            />
           
        </div>
    );
};

export default Form;
