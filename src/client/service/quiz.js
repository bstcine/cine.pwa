import {get} from '@/service/request';
import Api from '@/../APIConfig';

export let getQuiz = query => {
    let id = query.id;
    return get(Api.APIURL_Content_Quiz + id, query)
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log(error);
        });
};
