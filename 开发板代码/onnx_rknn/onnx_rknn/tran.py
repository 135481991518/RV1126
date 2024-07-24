import os
import urllib
import traceback
import time
import sys
from rknn.api import RKNN
ONNX_MODEL = 'D:/Lenovo/Desktop/学习/海峡信息赛/模型/onnx_rknn/half/half.onnx'
RKNN_MODEL = 'half.rknn'
DATASET = './dataset.txt'

QUANTIZE_ON = True

BOX_THRESH = 0.5
NMS_THRESH = 0.6
IMG_SIZE = 640

if __name__ == '__main__':

    # Create RKNN object
    rknn = RKNN()

    if not os.path.exists(ONNX_MODEL):
        print('model not exist')
        exit(-1)

    # pre-process config
    print('--> Config model')
    rknn.config(reorder_channel='0 1 2',
                mean_values=[[0, 0, 0]],
                std_values=[[255, 255, 255]],
                optimization_level=3,
                target_platform='rv1126',
                output_optimize=1,
                quantize_input_node=QUANTIZE_ON)
    print('done')

    # Load ONNX model
    print('--> Loading model')
    ret = rknn.load_onnx(model=ONNX_MODEL,outputs=['output', '393', '404']) #"output"])
    if ret != 0:
        print('Load yolov5 failed!')
        exit(ret)
    print('done')

    # Build model
    print('--> Building model')
    ret = rknn.build(do_quantization=False, dataset=DATASET) #do_quantization=QUANTIZE_ON
    if ret != 0:
        print('Build yolov5 failed!')
        exit(ret)
    print('done')

    # Export RKNN model
    print('--> Export RKNN model')
    ret = rknn.export_rknn(RKNN_MODEL)
    if ret != 0:
        print('Export yolov5rknn failed!')
        exit(ret)
    print('done')

    rknn.release()
