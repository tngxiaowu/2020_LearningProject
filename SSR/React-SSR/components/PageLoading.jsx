import {Spin} from 'antd'

export default ()=>(
    <div className='root'>
        <Spin>

        </Spin>
        <style jsx>{
            `
                .root{
                    position: fixed;
                    left:0;
                    right:0;
                    bottom:0;
                    top:0;
                    display:flex;
                    z-index:10001;
                    align-items: center;
                    justify-content: center;
                } 
            ` 
        }
       
        </style>
    </div>
)  