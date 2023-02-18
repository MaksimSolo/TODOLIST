import React from 'react';

export const PageNotFound = () => {
  return (
    <article>
      <h1>ERROR 404</h1>
      <h4 style={{textAlign: 'justify'}}>Ошибка 404 или Not Found («не найдено») — стандартный код ответа HTTP о том,
        что клиент
        был в состоянии общаться с сервером, но сервер не может найти данные согласно запросу.
        Ошибку 404 не следует путать с ошибкой «Сервер не найден» или иными ошибками,
        указывающими на ограничение доступа к серверу. Ошибка 404 означает, что запрашиваемый
        ресурс может быть доступен в будущем, что однако не гарантирует наличие прежнего
        содержания.
        Пользователи наиболее часто сталкиваются с ошибкой 404 при посещении так называемых
        «битых» или «мёртвых ссылок», что делает, таким образом, ошибку 404 одной из наиболее
        узнаваемых ошибок в сети Интернет</h4>
    </article>
  );
};
