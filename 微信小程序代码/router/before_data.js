// ����������ȡ�û���¼�Ժ������
const express = require('express')
const baefore_data_Router = express.Router()
const baefore_data_Router_1 = express.Router()
// ����ӿڵĿ�Խ����
const cors = require('cors')
baefore_data_Router.use(cors())
baefore_data_Router_1.use(cors())
const data_handler = require('../router_handler/before_data_handler')
// ����·�ɴ�����,�ж��Ƿ��������˺�,���ǵ�¼��ҳ��
baefore_data_Router.post('/before_data', data_handler.before_data_handler)
baefore_data_Router_1.get('/delete_data', data_handler.before_data_handler)  //ɾ���û�ѡ�е�����
module.exports = {
    baefore_data_Router, baefore_data_Router_1
}