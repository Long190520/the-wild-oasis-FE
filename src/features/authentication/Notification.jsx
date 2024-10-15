import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Spinner from "../../ui/Spinner";
import { useNotifications } from "./useNotifications";
import styled from "styled-components";

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  width: 250px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;

  .dropdown-item {
    padding: 1rem;
    border-bottom: 1px solid var(--color-grey-200);
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--color-grey-50);
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
      color: var(--color-grey-700);
    }

    p {
      margin: 0.5rem 0 0;
      font-size: 1.2rem;
      color: var(--color-grey-500);
    }
  }
`;

function Notification() {
  const { notifications, isLoading } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isLoading) return <Spinner />;

  const badge = notifications.length > 9 ? "9+" : `${notifications.length}`;

  return (
    <div style={{ position: "relative" }}>
      <ButtonIcon onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <HiOutlineBell />
        {notifications.length > 0 && <span>{badge}</span>}
      </ButtonIcon>

      {isDropdownOpen && (
        <DropdownMenu>
          {notifications.length === 0 ? (
            <div className="dropdown-item">
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((element) => (
              <div key={element.id} className="dropdown-item">
                <div className="dropdown-item-body">
                  <h3>{element.title}</h3>
                  <p>{element.description}</p>
                </div>
              </div>
            ))
          )}
        </DropdownMenu>
      )}
    </div>
  );
}

export default Notification;
