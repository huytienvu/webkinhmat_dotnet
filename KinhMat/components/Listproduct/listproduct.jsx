import './style.css'
import { useSearchParams } from 'next/navigation';
import { filterProduct, getListProductCategory, searchProduct } from '../../services/product';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import '../../assets/style.css'

export default function Listproduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const tk = searchParams.get('search');
  const chatlieu = searchParams.get('chatlieu');
  const kieudang = searchParams.get('kieudang');

  const [tranghientai, settranghientai] = useState(0);
  const [tongtrang, settongtrang] = useState(0);



  const handlePageClick = (event) => {
    settranghientai(event.selected);

  };
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const fetchData = async (pageNumber) => {


      if (id) {
        const data = await getListProductCategory(id, pageNumber + 1, 6);
        setproduct(data.data);
        settongtrang(data.total);


      }
      if (tk) {
        const dataSearch = await searchProduct(tk);
        setproduct(dataSearch.data)
      }
      else if (chatlieu || kieudang) {
        const dataFilter = await filterProduct(chatlieu || '', kieudang || '');
        setproduct(dataFilter);
      }
    }
    fetchData(tranghientai);
  }, [id, tk, chatlieu, kieudang, tranghientai])

  return (
    <div>
      <div className="app-right">
        <div className="gioithieu-kinhcan">
          <h1>GỌNG KÍNH CẬN</h1>
          <p>Kính cận, gọng kính cận DESMON cao cấp, hợp thời trang</p>
          <p className="p-nhieudong">
            Bạn đang tìm mua kính cận, gọng kính cận thời trang, gọng kính cận nam, gọng kính cận nữ? Vậy đừng quên ghé qua DESMON để trải nghiệm những sản phẩm hot nhất trên thị trường năm 2021 nhé! DESMON không chỉ mang đến cho quý khách kính mắt chất lượng nhất mà đồng thời, chúng tôi còn tiên phong trong việc cung cấp thêm các thông tin hữu ích, giúp bạn hiểu rõ hơn và lựa chọn sản phẩm cho phù hợp.
          </p>
          <div className="hide-text">
            <em>
              Xem thêm các mẫu <a style={{ textDecoration: 'none' }} href="#">Kính râm cận</a> thời trang nhất tại DESMON
            </em>
            <h2>Các loại kính cho người cận thị</h2>
            <p>
              Hiện nay có 2 loại kính chính cho người cận thị là kính gọng và kính áp tròng. Kính gọng được chia ra làm nhiều loại như kính cận đổi màu, kính mát cho người cận thị. Mỗi loại kính có một ưu nhược điểm khác nhau. Để lựa chọn loại kính nào tùy thuộc vào đặc tính nghề nghiệp và thẩm mỹ của từng người.
            </p>
            <em><strong>Cập nhật thêm những thông tin mới nhất về kính cận thời trang:</strong></em>
            <ul>
              <li>Cách Chọn Kính Cận Phù Hợp Với Khuôn Mặt</li>
            </ul>
            <p>
              <img src="/images/product0.jpg" alt="" />
            </p>
            <p style={{ textAlign: 'center' }}>
              <i>Kính gọng là loại kính cận phổ biến nhất cho những người bị cận thị</i>
            </p>
            <p><strong>Ưu điểm gọng kính đẹp</strong></p>
            <ul>
              <li>Kính gọng tiết kiệm hơn kính áp tròng...</li>
              <li>Đeo kính cận có gọng không phải chạm trực tiếp tay vào mắt...</li>
              <li>Đeo kính gọng thời trang hạn chế khả năng khô mắt...</li>
              <li>Có thể sử dụng kính cận có gọng như một phụ kiện thời trang...</li>
              <li>Kính gọng bảo vệ mắt khỏi các tác hại từ môi trường...</li>
              <li>Cách đeo kính gọng vô cùng đơn giản...</li>
            </ul>
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            color: '#4872FA',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          className="btnxemthem"
        >
          Xem thêm
        </p>

        <div className="list-product">
          {
            (product).map((sp) => (
              <div className="product20" style={{ float: 'left' }} onClick={() => router.push(`/products?id=${sp.id}`)}>
                <img
                  src={`http://localhost:5273/images/product/${sp.anh}`}
                  alt="Không có"
                  style={{ width: '100%', height: '255px', objectFit: 'cover' }}
                />
                <span>
                  <p>SALE!</p>
                </span>
                <p style={{ textAlign: 'center', margin: '15px 3px' }}>
                  {sp.ten}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  <div style={{ color: 'rgb(249, 98, 5)', marginLeft: '3px' }}>
                    {sp.giaban.toLocaleString("vi-VN")} đ
                  </div>
                </div>
              </div>
            ))
          }




        </div>



        <div className="page-sanpham">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={
              handlePageClick
            }
            pageRangeDisplayed={3}
            pageCount={tongtrang} // Sử dụng giá trị total từ API (đã là tổng số trang)
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
            forcePage={tranghientai} // Đảm bảo trang hiện tại được highlight đúng
          />
          {/* <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>...</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  )
}
